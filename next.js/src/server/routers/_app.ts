import { credentials } from '@grpc/grpc-js'
import { procedure, router } from '../trpc'
import { TradingClient } from "~/grpc/v1/trading";

const tradingClient = new TradingClient('localhost:50051', credentials.createInsecure());

export const appRouter = router({
    getStockList: procedure.query(async () => {
        const stocks = new Promise((resolve, reject) => {
            tradingClient.getStockList({}, (err, stockListResp) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(stockListResp.stockList);
            });
        });
        return stocks;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
