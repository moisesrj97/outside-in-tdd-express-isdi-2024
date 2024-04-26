import {ExpressServer} from "../../src/server/infrastructure/ExpressServer";
import request from "supertest";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {PrismaClient} from "@prisma/client";
import {afterAll, afterEach, beforeAll, describe, it } from "vitest";
import {execSync} from "node:child_process";
describe('User', () => {
    // let container: StartedPostgreSqlContainer;
    // let prisma: PrismaClient;
    // beforeAll(async () => {
    //     container = await new PostgreSqlContainer().start();
    //     const dbUrl = container.getConnectionUri();
    //     execSync(`DATABASE_URL=${dbUrl} yarn prisma db push`);
    //     prisma = new PrismaClient({
    //         datasourceUrl: dbUrl,
    //     });
    //
    // })
    // afterEach(async () => {
    //     await prisma.cat.deleteMany()
    // })
    // afterAll(() => {
    //     container.stop()
    // })
    it('should be able to check the status of the server', () => {
        const server = new ExpressServer([]);
        request(server.app).get('/health').expect(200, {status: "OK"});
    });
});
