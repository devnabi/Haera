import { List, ListItem } from "src/lists/list.entitiy";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

export const typeORMConfig : SqliteConnectionOptions = {
    // Database Type
    type: "sqlite",

    // SQLite 데이터베이스 파일 경로
    database: "haera.sqlite",

    // 데이터베이스 스키마를 앱의 엔티티와 자동으로 동기화
    synchronize: true,

    // SQL 쿼리 로깅을 활성화
    logging: true,

    // 엔티티 디렉토리 지정 : 생성한 모든 엔티티 포함
    // entities: [__dirname + '../**/*.entity{.ts,.js}']
    entities: [List, ListItem]
}
