# 사전테스트

본 사전테스트는 `글로벌핀테크산업진흥센터 - [엔지니어 중/고급과정 - 스타트업 서비스 개발/확장 단계 교육]`에 참여하기 위한 테스트 입니다. 해당 과정에서는 짧은 시간에 매우 다양하고 넓은 범위의 기술들이 소개되고 실습에 사용되기 때문에 과정을 소화할 수 있는지를 확인하기 위하여 테스트를 준비하게 되었습니다. 테스트에 사용되는 기술들과 환경은 본 교육과정에서도 동일하게 적용되므로 과정에 참여하시기 전에 예습의 효과도 기대하고 있습니다.

아래의 안내에 따라 환경을 구성하고 실제 서비스 코드를 구동하면서 질문에 답해주시기 바랍니다. 문제의 질문은 안내에 따랐을 때 어떤 결과가 나오는 지에 대한 것과 동작을 완성하기 위해 추가해야 하는 것들에 대한 것 입니다.

## A. 로컬 환경에 인프라 설치하기

docker와 docker-compose 환경을 구성하고 다음의 명령을 수행합니다.

```shell
$ cd ${repository_path}/.local
$ docker-compose up -d
$ docker ps -a
```

위 명령이 성공하면 아래와 같은 인프라들이 설치됩니다.

* PostgreSQL
* Grafana
* Prometheus
* Prometheus export for PostgreSQL
* cAdvisor

## B. 그라파나에 대시보드 설치하기

1\. 아래의 주소로 계정으로 그라파나에 로그인 합니다.
* http://localhost:13000
* ID: admin
* PW: adminpw

2\. 우측 상단에 `+` 버튼을 누르면 아래와 같이 세 개의 메뉴가 보입니다.
* New dashaboard
* Import dashboard
* Create alert rule

3\. `Import dashboard`를 선택합니다.

4\. `Import via grafana.com`이라고 쓰인 인풋필드에 아래의 숫자들을 차례로 입력하여 대시보드를 `import` 합니다.
* 3662
* 9628
* 14282

> ### **문제1.** 그라파나 대시보드를 설치하세요. 
> 위에서 3개의 그라파나 대시보드를 `import` 했을때 자동으로 만들어지는 대시보드의 이름을 순서대로 답해주세요.
> 1. **3662**:
> 2. **9628**:
> 3. **14282**:

## C. gRPC 서버 실행하기

1\. GO 컴파일 환경을 구성하고 아래의 명령을 수행합니다.
```shell
$ cd ${repository_path}/grpc-server
$ go mod tidy
```

2\. 아래의 SQL 쿼리를 작성합니다.

> ### 문제2. SQL 쿼리를 작성하여 GO 코드를 완성하세요.
> 
> 현재 설치된 PostgreSQL에는 `postgres` 데이터베이스에 아래와 같은 테이블이 생성되어 있습니다. 또한, 테스트를 위한 데이터들이 입력되어 있습니다.
>
> ```sql
> CREATE TABLE "stocks" (
>     "id" BIGSERIAL,
>     "code" VARCHAR(3),
>     "name" VARCHAR(255),
>     "total_stock_count" INTEGER,
>     UNIQUE ("code"),
>     UNIQUE ("name"),
>     PRIMARY KEY ("id")
> );
> ```
> 
> 상기 `stocks` 테이블에서 `id`, `code`, `name`, `total_stock_count` 컬럼의 값들를 `code` 값의 알파벳 순서대로 정렬하여 가져오는 `SELECT` 쿼리를 작성하세요.
> * **Query**:

3\. 2번에서 작성한 쿼리를 GO 코드에 추가합니다. 쿼리를 추가할 위치는 아래와 같습니다.
* https://github.com/ghilbut/pre-test/blob/main/grpc-server/cmd/main.go#L86

4\. 아래의 명령으로 서버를 실행합니다.
```shell
$ cd ${repository_path}/grpc-server
$ go run ./cmd
```

## D. Grafana k6로 gRPC 서버 동작 확인하기

1\. 아래 홈페이지를 참고하여 `k6`를 설치합니다.
* https://k6.io/

2\. 아래의 명령으로 `k6`를 실행하여 테스트가 정상 동작하는지 확인합니다.
```shell
$ cd ${repository_path}/k6
$ ./run.sh
```

## E. Next.js 프론트엔드 실행하기

1\. 아래 홈페이지를 참고하여 `yarn`을 설치합니다.
* https://yarnpkg.com/

2\. 아래의 명령으로 패키지들을 설치합니다.
```shell
$ ${repository_path}/next.js
$ yarn install
```

3\. 아래의 명령으로 `nex.js` 개발 서버를 실행합니다.
```shell
$ ${repository_path}/next.js
$ yarn dev
```

4\. 다음의 주소로 웹브라우저에서 프론트엔드 페이지를 볼 수 있습니다.
* http://localhost:3000

> ### 문제3. `next.js`에 패키지를 추가하세요.
> 현재 상태에서는 페이지가 정상적으로 동작하지 않습니다. 그 이유는 꼭 필요한 패키지 하나가 설치되지 않았기 때문입니다. 어떤 패키지를 설치해야 정상적으로 동작할까요?
> ```shell
> $ yarn add <package name>
> ```
> * **package name**:

> ### 문제4. 네번째 아이템의 `ID`와 `Code`는 무엇입니까?
> 문제3번까지 해결했다면, 이제 정상적인 화면을 볼 수 있습니다. 이 때 화면의 목록에서 네번째 아이템의 `ID`와 `Code`는 무엇인가요?
> * **ID**:
> * **Code**:
