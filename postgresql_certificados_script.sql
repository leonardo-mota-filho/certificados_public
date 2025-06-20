PGDMP              
        }            certificadosnano    17.4    17.4 #    R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            U           1262    16388    certificadosnano    DATABASE     v   CREATE DATABASE certificadosnano WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pt-BR';
     DROP DATABASE certificadosnano;
                     postgres    false            �            1259    16389    certificate    TABLE     �   CREATE TABLE public.certificate (
    scpf character(11) NOT NULL,
    classid character(8) NOT NULL,
    isavailable boolean DEFAULT false NOT NULL,
    id character(11) NOT NULL
);
    DROP TABLE public.certificate;
       public         heap r       postgres    false            �            1259    16500 	   classinfo    TABLE     �   CREATE TABLE public.classinfo (
    id character(7) NOT NULL,
    content text NOT NULL,
    period text NOT NULL,
    courseid integer NOT NULL,
    rollcallqtd integer NOT NULL,
    rollcallpw character varying NOT NULL
);
    DROP TABLE public.classinfo;
       public         heap r       postgres    false            �            1259    16414    course    TABLE     �   CREATE TABLE public.course (
    name character varying(100) NOT NULL,
    hours smallint NOT NULL,
    secondprofcpf character(11),
    id integer NOT NULL
);
    DROP TABLE public.course;
       public         heap r       postgres    false            �            1259    16522    course_id_seq    SEQUENCE     �   ALTER TABLE public.course ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.course_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    219            �            1259    16443    inclass    TABLE     d   CREATE TABLE public.inclass (
    scpf character(11) NOT NULL,
    classid character(8) NOT NULL
);
    DROP TABLE public.inclass;
       public         heap r       postgres    false            �            1259    16421 	   professor    TABLE     �   CREATE TABLE public.professor (
    cpf character(11) NOT NULL,
    name character varying(100) NOT NULL,
    signatureurl character varying(500) NOT NULL
);
    DROP TABLE public.professor;
       public         heap r       postgres    false            �            1259    16593    rollcall    TABLE     �   CREATE TABLE public.rollcall (
    scpf character(11) NOT NULL,
    classid character(7) NOT NULL,
    rollcallids character varying NOT NULL
);
    DROP TABLE public.rollcall;
       public         heap r       postgres    false            �            1259    16394    student    TABLE     �   CREATE TABLE public.student (
    cpf character(11) NOT NULL,
    name character varying(100) NOT NULL,
    email text NOT NULL,
    phone text NOT NULL
);
    DROP TABLE public.student;
       public         heap r       postgres    false            H          0    16389    certificate 
   TABLE DATA           E   COPY public.certificate (scpf, classid, isavailable, id) FROM stdin;
    public               postgres    false    217   �(       M          0    16500 	   classinfo 
   TABLE DATA           [   COPY public.classinfo (id, content, period, courseid, rollcallqtd, rollcallpw) FROM stdin;
    public               postgres    false    222   �(       J          0    16414    course 
   TABLE DATA           @   COPY public.course (name, hours, secondprofcpf, id) FROM stdin;
    public               postgres    false    219   �(       L          0    16443    inclass 
   TABLE DATA           0   COPY public.inclass (scpf, classid) FROM stdin;
    public               postgres    false    221   �(       K          0    16421 	   professor 
   TABLE DATA           <   COPY public.professor (cpf, name, signatureurl) FROM stdin;
    public               postgres    false    220   )       O          0    16593    rollcall 
   TABLE DATA           >   COPY public.rollcall (scpf, classid, rollcallids) FROM stdin;
    public               postgres    false    224   0)       I          0    16394    student 
   TABLE DATA           :   COPY public.student (cpf, name, email, phone) FROM stdin;
    public               postgres    false    218   M)       V           0    0    course_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.course_id_seq', 1027, true);
          public               postgres    false    223            �           2606    16466    inclass PKs 
   CONSTRAINT     V   ALTER TABLE ONLY public.inclass
    ADD CONSTRAINT "PKs" PRIMARY KEY (scpf, classid);
 7   ALTER TABLE ONLY public.inclass DROP CONSTRAINT "PKs";
       public                 postgres    false    221    221            �           2606    16549    certificate UniqueStudentClass 
   CONSTRAINT     w   ALTER TABLE ONLY public.certificate
    ADD CONSTRAINT "UniqueStudentClass" UNIQUE NULLS NOT DISTINCT (scpf, classid);
 J   ALTER TABLE ONLY public.certificate DROP CONSTRAINT "UniqueStudentClass";
       public                 postgres    false    217    217            �           2606    16592    certificate certificate_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.certificate
    ADD CONSTRAINT certificate_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.certificate DROP CONSTRAINT certificate_pkey;
       public                 postgres    false    217            �           2606    16527    course course_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public                 postgres    false    219            �           2606    16529    classinfo id 
   CONSTRAINT     J   ALTER TABLE ONLY public.classinfo
    ADD CONSTRAINT id PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.classinfo DROP CONSTRAINT id;
       public                 postgres    false    222            �           2606    16599    rollcall pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.rollcall
    ADD CONSTRAINT pkey PRIMARY KEY (scpf, classid);
 7   ALTER TABLE ONLY public.rollcall DROP CONSTRAINT pkey;
       public                 postgres    false    224    224            �           2606    16427    professor professor_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (cpf);
 B   ALTER TABLE ONLY public.professor DROP CONSTRAINT professor_pkey;
       public                 postgres    false    220            �           2606    16398    student student_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (cpf);
 >   ALTER TABLE ONLY public.student DROP CONSTRAINT student_pkey;
       public                 postgres    false    218            �           2606    16581    inclass uniqueCpfClassid 
   CONSTRAINT     ^   ALTER TABLE ONLY public.inclass
    ADD CONSTRAINT "uniqueCpfClassid" UNIQUE (scpf, classid);
 D   ALTER TABLE ONLY public.inclass DROP CONSTRAINT "uniqueCpfClassid";
       public                 postgres    false    221    221            �           2606    16582    certificate FK    FK CONSTRAINT     �   ALTER TABLE ONLY public.certificate
    ADD CONSTRAINT "FK" FOREIGN KEY (scpf, classid) REFERENCES public.inclass(scpf, classid) ON DELETE CASCADE NOT VALID;
 :   ALTER TABLE ONLY public.certificate DROP CONSTRAINT "FK";
       public               postgres    false    217    221    221    217    4778            �           2606    16565    inclass classinfoFK    FK CONSTRAINT     �   ALTER TABLE ONLY public.inclass
    ADD CONSTRAINT "classinfoFK" FOREIGN KEY (classid) REFERENCES public.classinfo(id) ON DELETE CASCADE NOT VALID;
 ?   ALTER TABLE ONLY public.inclass DROP CONSTRAINT "classinfoFK";
       public               postgres    false    222    221    4782            �           2606    16575    classinfo courseidFK    FK CONSTRAINT     �   ALTER TABLE ONLY public.classinfo
    ADD CONSTRAINT "courseidFK" FOREIGN KEY (courseid) REFERENCES public.course(id) ON DELETE CASCADE NOT VALID;
 @   ALTER TABLE ONLY public.classinfo DROP CONSTRAINT "courseidFK";
       public               postgres    false    4774    219    222            �           2606    16600    rollcall fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.rollcall
    ADD CONSTRAINT fkey FOREIGN KEY (scpf, classid) REFERENCES public.inclass(scpf, classid) ON DELETE CASCADE;
 7   ALTER TABLE ONLY public.rollcall DROP CONSTRAINT fkey;
       public               postgres    false    221    4778    221    224    224            �           2606    16570    course secondprofessorFK    FK CONSTRAINT     �   ALTER TABLE ONLY public.course
    ADD CONSTRAINT "secondprofessorFK" FOREIGN KEY (secondprofcpf) REFERENCES public.professor(cpf) ON DELETE SET NULL NOT VALID;
 D   ALTER TABLE ONLY public.course DROP CONSTRAINT "secondprofessorFK";
       public               postgres    false    4776    220    219            �           2606    16560    inclass studentFK    FK CONSTRAINT     �   ALTER TABLE ONLY public.inclass
    ADD CONSTRAINT "studentFK" FOREIGN KEY (scpf) REFERENCES public.student(cpf) ON DELETE CASCADE NOT VALID;
 =   ALTER TABLE ONLY public.inclass DROP CONSTRAINT "studentFK";
       public               postgres    false    4772    218    221            H      x������ � �      M      x������ � �      J      x������ � �      L      x������ � �      K      x������ � �      O      x������ � �      I      x������ � �     