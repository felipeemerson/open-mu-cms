CREATE SCHEMA IF NOT EXISTS cms;

SET search_path TO cms;

CREATE TABLE IF NOT EXISTS "News" (
    "Id" uuid NOT NULL,
    "AuthorId" uuid NOT NULL,
    "Author" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "Category" text COLLATE pg_catalog."default",
    "Title" text  COLLATE pg_catalog."default" NOT NULL,
    "Content" text  COLLATE pg_catalog."default" NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "LastUpdatedDate" timestamp with time zone,
    CONSTRAINT "PK_News" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Character_Id" FOREIGN KEY ("AuthorId")
        REFERENCES data."Character" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "Banner" (
    "Id" uuid NOT NULL,
    "ImageUrl" text COLLATE pg_catalog."default" NOT NULL,
    "HasLink" boolean NOT NULL,
    "IsExternalLink" boolean,
    "Link" text COLLATE pg_catalog."default",
    "OrderIndex" integer NOT NULL,
    CONSTRAINT "PK_Banner" PRIMARY KEY ("Id")
)