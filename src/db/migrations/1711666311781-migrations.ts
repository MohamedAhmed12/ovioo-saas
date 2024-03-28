import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711666311781 implements MigrationInterface {
    name = 'Migrations1711666311781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_types" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "info" jsonb, "extraInfo" text, "planId" integer NOT NULL, CONSTRAINT "PK_232576669c4df1f0a15e1300ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plan_extra_bundles" ("id" SERIAL NOT NULL, "hours" integer NOT NULL, "fees" integer NOT NULL, "planId" integer, CONSTRAINT "PK_9523164d8bff4e60931051ccb24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plans" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "services" character varying array NOT NULL, "background_color" text, "daily_fees" integer, "monthly_fees" integer, "quarterly_fees" integer, "annual_fees" integer, "monthly_credit_hours" integer, "daily_deducted_hours" integer, "is_full_time" boolean NOT NULL DEFAULT false, "is_most_popular" boolean DEFAULT false, "stripe_id" text, CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ovioo_subscriptions" ("id" SERIAL NOT NULL, "total_credit_hours" integer NOT NULL, "remaining_credit_hours" integer NOT NULL, "extra_bundle_hours" integer NOT NULL DEFAULT '0', "daily_deducted_hours" integer, "status" text NOT NULL DEFAULT 'Active', "start_at" TIMESTAMP NOT NULL, "expire_at" TIMESTAMP NOT NULL, "canceled_at" TIMESTAMP, "stripe_id" text NOT NULL, "teamId" integer, "planId" integer, CONSTRAINT "PK_d04a8116326666d78d5cdd9afa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "name" text NOT NULL DEFAULT '', "owner_id" integer NOT NULL, "stripe_client_reference_id" text NOT NULL, "card_last4" text, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL DEFAULT '', "status" text NOT NULL DEFAULT 'In queue', "designer_fees" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "typeId" integer, "projectId" integer, "teamId" integer, "designerId" integer, "parentId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "teamId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" SERIAL NOT NULL, "src" text NOT NULL, "alt" text, "type" text NOT NULL, "projectId" integer, "taskId" integer, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "content" text, "voice_note_src" text, "status" text NOT NULL DEFAULT 'sent', "received_by" character varying array NOT NULL DEFAULT '{}', "read_by" character varying array NOT NULL DEFAULT '{}', "sender_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "taskId" integer, "assetId" integer, CONSTRAINT "REL_bb7b5f8c63920558ae91488fbd" UNIQUE ("assetId"), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "designer_transactions" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "currency" text NOT NULL DEFAULT 'EGP', "transaction_date" TIMESTAMP NOT NULL DEFAULT now(), "status" text NOT NULL DEFAULT 'completed', "designerId" integer NOT NULL, CONSTRAINT "PK_cf906cf979179a5829c0313e96d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "content" text, "action" text, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "company_name" text DEFAULT '', "company_website" text DEFAULT '', "business_info" text DEFAULT '', "target_audience" text DEFAULT '', "company_links" text DEFAULT '', "push_notification_enabled" boolean DEFAULT false, "mail_notification_enabled" boolean DEFAULT false, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "user_id" integer, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullname" text NOT NULL, "email" text NOT NULL, "password" text, "avatar" text, "company" text, "phone" text, "isActive" boolean NOT NULL DEFAULT false, "provider" text NOT NULL, "role" text NOT NULL DEFAULT 'user', "resetToken" character varying, "resetTokenExpired_at" TIMESTAMP, "designer_credit" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_teams_teams" ("usersId" integer NOT NULL, "teamsId" integer NOT NULL, CONSTRAINT "PK_bb05cc6462faa7baf501fa2adc0" PRIMARY KEY ("usersId", "teamsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d44297b07f4b6ea1418d2fedb" ON "users_teams_teams" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58b76a3454c868f649f25c0365" ON "users_teams_teams" ("teamsId") `);
        await queryRunner.query(`ALTER TABLE "task_types" ADD CONSTRAINT "FK_8c3617c38961662f2f32bf81696" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plan_extra_bundles" ADD CONSTRAINT "FK_ab854646e866b4a7b33ec4bb7e8" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ovioo_subscriptions" ADD CONSTRAINT "FK_1eeaea185b623d8ffb76164d8af" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ovioo_subscriptions" ADD CONSTRAINT "FK_e9e660b94b682de2f477c1258ed" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b6146961ce2699a63b5bd227a95" FOREIGN KEY ("typeId") REFERENCES "task_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_12c5f5304c7d7c4deb27046671d" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_696ec3138bcd15c2651a8369fab" FOREIGN KEY ("designerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_1cbec65196d4cf86dd8ab464085" FOREIGN KEY ("parentId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_d0474b642dc0ae63660dd8e2ac0" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_e8d6f1f931bbeea918b07aa6ace" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_24519d2fa5579db4f6c9f72f9d0" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_d4f63b9a33826eb052fd934b070" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bb7b5f8c63920558ae91488fbd7" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "designer_transactions" ADD CONSTRAINT "FK_790165f43c565d23b7197a5a021" FOREIGN KEY ("designerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_teams_teams" ADD CONSTRAINT "FK_5d44297b07f4b6ea1418d2fedbc" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_teams_teams" ADD CONSTRAINT "FK_58b76a3454c868f649f25c03652" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_teams_teams" DROP CONSTRAINT "FK_58b76a3454c868f649f25c03652"`);
        await queryRunner.query(`ALTER TABLE "users_teams_teams" DROP CONSTRAINT "FK_5d44297b07f4b6ea1418d2fedbc"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "designer_transactions" DROP CONSTRAINT "FK_790165f43c565d23b7197a5a021"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bb7b5f8c63920558ae91488fbd7"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_d4f63b9a33826eb052fd934b070"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_24519d2fa5579db4f6c9f72f9d0"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_e8d6f1f931bbeea918b07aa6ace"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_d0474b642dc0ae63660dd8e2ac0"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_1cbec65196d4cf86dd8ab464085"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_696ec3138bcd15c2651a8369fab"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_12c5f5304c7d7c4deb27046671d"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b6146961ce2699a63b5bd227a95"`);
        await queryRunner.query(`ALTER TABLE "ovioo_subscriptions" DROP CONSTRAINT "FK_e9e660b94b682de2f477c1258ed"`);
        await queryRunner.query(`ALTER TABLE "ovioo_subscriptions" DROP CONSTRAINT "FK_1eeaea185b623d8ffb76164d8af"`);
        await queryRunner.query(`ALTER TABLE "plan_extra_bundles" DROP CONSTRAINT "FK_ab854646e866b4a7b33ec4bb7e8"`);
        await queryRunner.query(`ALTER TABLE "task_types" DROP CONSTRAINT "FK_8c3617c38961662f2f32bf81696"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58b76a3454c868f649f25c0365"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d44297b07f4b6ea1418d2fedb"`);
        await queryRunner.query(`DROP TABLE "users_teams_teams"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "designer_transactions"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "ovioo_subscriptions"`);
        await queryRunner.query(`DROP TABLE "plans"`);
        await queryRunner.query(`DROP TABLE "plan_extra_bundles"`);
        await queryRunner.query(`DROP TABLE "task_types"`);
    }

}
