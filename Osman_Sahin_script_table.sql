-- Table: public.payments

-- DROP TABLE IF EXISTS public.payments;

CREATE TABLE IF NOT EXISTS public.payments
(
    id uuid NOT NULL,
    creditor_account character varying(34) COLLATE pg_catalog."default" NOT NULL,
    debtor_account character varying(34) COLLATE pg_catalog."default" NOT NULL,
    date character varying(8) COLLATE pg_catalog."default" NOT NULL,
    currency character varying(3) COLLATE pg_catalog."default" NOT NULL,
    amount bigint,
    is_deleted boolean NOT NULL DEFAULT false,
    CONSTRAINT payments_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.payments
    OWNER to postgres;