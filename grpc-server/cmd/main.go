package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"

	// external packages
	_ "github.com/lib/pq"
	"github.com/speps/go-hashids"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/types/known/emptypb"

	// project packages
	pb "github.com/ghilbut/test/trading/v1"
)

const (
	DBSession string = "dbSession"
	HashID    string = "hashIDData"
)

func DBUnaryServerInterceptor(session *sql.DB) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		return handler(context.WithValue(ctx, DBSession, session), req)
	}
}

func HashUnaryServerInterceptor(h *hashids.HashID) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		return handler(context.WithValue(ctx, HashID, h), req)
	}
}

func main() {
	connStr := "host=localhost user=postgres password=postgrespw dbname=postgres sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	hd := hashids.NewData()
	hd.Salt = "salt"
	hd.MinLength = 7
	h, err := hashids.NewWithData(hd)
	if err != nil {
		log.Fatal(err)
	}

	creds := insecure.NewCredentials()
	grpcServer := grpc.NewServer(
		grpc.Creds(creds),
		grpc.ChainUnaryInterceptor(
			DBUnaryServerInterceptor(db),
			HashUnaryServerInterceptor(h),
		),
	)

	trading := TradingServer{}
	pb.RegisterTradingServer(grpcServer, &trading)

	listen, err := net.Listen("tcp", fmt.Sprintf("localhost:50051"))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	log.Println("run server port 50051")

	if err := grpcServer.Serve(listen); err != nil {
		log.Fatalf("failed to run grpc server: %v", err)
	}
}

type TradingServer struct {
	pb.TradingServer
}

func (s *TradingServer) GetStockList(ctx context.Context, empty *emptypb.Empty) (*pb.StockListResp, error) {

	db := ctx.Value(DBSession).(*sql.DB)
	hash := ctx.Value(HashID).(*hashids.HashID)

	rows, err := db.Query("")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	list := make([]*pb.Stock, 0, 10)

	for rows.Next() {
		var id int64
		var code, name string
		var totalStockCount uint32
		if err := rows.Scan(&id, &code, &name, &totalStockCount); err != nil {
			log.Fatal(err)
		}

		enc, _ := hash.EncodeInt64([]int64{id})

		list = append(list, &pb.Stock{
			Id: enc,
			Code: code,
			Name: name,
			TotalStockCount: totalStockCount,
		})
	}

	return &pb.StockListResp{
		StockList: list,
	}, nil
}
