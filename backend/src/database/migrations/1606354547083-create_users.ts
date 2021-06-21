import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1606354547083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ 
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'string',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'string',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'string',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: "DateTime('now')"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}