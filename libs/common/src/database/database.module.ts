import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config';

@Module({
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
        }),
        inject: [ConfigService],
    })],
})
export class DatabaseModule {
    static forFeture(models:ModelDefinition[]):any {
        return MongooseModule.forFeature(models);
    }
}
