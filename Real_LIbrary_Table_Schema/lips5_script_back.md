USE [lips5_sql]
GO
/****** Object:  Schema [EBooks]    Script Date: 03/09/2026 12:21:16 ******/
CREATE SCHEMA [EBooks] AUTHORIZATION [dbo]
GO
/****** Object:  Schema [Func]    Script Date: 03/09/2026 12:21:16 ******/
CREATE SCHEMA [Func] AUTHORIZATION [dbo]
GO
/****** Object:  Schema [lips]    Script Date: 03/09/2026 12:21:16 ******/
CREATE SCHEMA [lips] AUTHORIZATION [lips]
GO
/****** Object:  Table [dbo].[catagory]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[catagory](
	[cat_no] [smallint] NULL,
	[cat_name] [nvarchar](50) NULL,
	[due_no] [smallint] NULL,
	[due_day] [smallint] NULL,
	[fine_day] [float] NULL,
	[no_due] [smallint] NULL,
	[no_reserve] [smallint] NULL,
	[priority] [smallint] NULL,
	[valid_year] [smallint] NULL,
	[allow_indent] [smallint] NULL,
	[no_indent] [smallint] NULL,
	[renew_days] [smallint] NULL,
	[fix_due] [smallint] NULL,
	[due_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cash_rec_sf]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cash_rec_sf](
	[trans_no] [int] NULL,
	[t_date] [smalldatetime] NULL,
	[head_name] [nvarchar](30) NULL,
	[amount] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cash_rec_aid]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cash_rec_aid](
	[trans_no] [int] NULL,
	[t_date] [smalldatetime] NULL,
	[head_name] [nvarchar](30) NULL,
	[amount] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cash_pay_sf]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cash_pay_sf](
	[trans_no] [int] NULL,
	[t_date] [smalldatetime] NULL,
	[head_name] [nvarchar](30) NULL,
	[amount] [float] NULL,
	[bill_no] [nvarchar](25) NULL,
	[vendor] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cash_pay_aid]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cash_pay_aid](
	[trans_no] [int] NULL,
	[t_date] [smalldatetime] NULL,
	[head_name] [nvarchar](30) NULL,
	[amount] [float] NULL,
	[bill_no] [nvarchar](25) NULL,
	[vendor] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cash_hand_sf]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cash_hand_sf](
	[t_date] [smalldatetime] NULL,
	[amount] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cash_hand_aid]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cash_hand_aid](
	[t_date] [smalldatetime] NULL,
	[amount] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bv_trans]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bv_trans](
	[id_no] [nvarchar](20) NULL,
	[vol_code] [nvarchar](10) NULL,
	[trans] [nvarchar](1) NULL,
	[t_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL,
	[other_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bv_circle]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bv_circle](
	[id_no] [nvarchar](20) NULL,
	[vol_code] [nvarchar](10) NULL,
	[due_date] [smalldatetime] NULL,
	[due_times] [smallint] NULL,
	[login_no] [smallint] NULL,
	[t_date] [smalldatetime] NULL,
	[card_no] [nvarchar](10) NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bv_abstract]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bv_abstract](
	[item_code] [nvarchar](50) NULL,
	[bv_abstract] [nvarchar](500) NULL,
	[item_no] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[buyer_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[buyer_master](
	[buyer_name] [varchar](100) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[budget_mat_spend]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[budget_mat_spend](
	[budget_no] [smallint] NULL,
	[t_date] [datetime] NULL,
	[authority] [varchar](50) NULL,
	[librarian] [varchar](50) NULL,
	[books] [float] NULL,
	[periods] [float] NULL,
	[nb] [float] NULL,
	[binding] [float] NULL,
	[station] [float] NULL,
	[others] [float] NULL,
	[pur_details] [varchar](250) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[budget_mat_alloc]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budget_mat_alloc](
	[budget_no] [smallint] NULL,
	[books] [float] NULL,
	[periods] [float] NULL,
	[nb] [float] NULL,
	[binding] [float] NULL,
	[station] [float] NULL,
	[others] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[budget_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budget_master](
	[lib_no] [smallint] NULL,
	[budget_year] [smallint] NULL,
	[total_amount] [float] NULL,
	[amount_avail] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[budget_dept_spend]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budget_dept_spend](
	[grant_no] [smallint] NULL,
	[sanc_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[pay_no] [int] NULL,
	[dept_no] [smallint] NULL,
	[bill_no] [nvarchar](10) NULL,
	[bill_date] [smalldatetime] NULL,
	[bill_amt] [float] NULL,
	[pay_mode] [nvarchar](1) NULL,
	[draft_name] [nvarchar](10) NULL,
	[draft_no] [nvarchar](20) NULL,
	[draft_date] [smalldatetime] NULL,
	[draft_amt] [float] NULL,
	[com_amt] [float] NULL,
	[bank_name] [nvarchar](50) NULL,
	[bank_branch] [nvarchar](30) NULL,
	[pay_details] [nvarchar](250) NULL,
	[remarks] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[budget_dept_alloc]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budget_dept_alloc](
	[grant_no] [smallint] NULL,
	[sanc_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[alloc_date] [smalldatetime] NULL,
	[alloc_details] [nvarchar](250) NULL,
	[alloc_amt] [float] NULL,
	[amt_blocked] [float] NULL,
	[amt_used] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BooksAbstractLinks]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BooksAbstractLinks](
	[AbstractLinkIdPK] [int] IDENTITY(1,1) NOT NULL,
	[AbstractIdFK] [int] NULL,
	[LibraryIdFK] [smallint] NULL,
	[LocationIdFK] [smallint] NULL,
	[AccnNo] [nvarchar](350) NULL,
	[CreatedDateTime] [datetime] NULL,
 CONSTRAINT [BooksAbstractLinks__AbstractLinkIdPK] PRIMARY KEY CLUSTERED 
(
	[AbstractLinkIdPK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BooksAbstract]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BooksAbstract](
	[AbstractIdPK] [int] IDENTITY(1,1) NOT NULL,
	[AbstractTypeIdFK] [tinyint] NULL,
	[ContentHTML] [nvarchar](4000) NULL,
	[ContentText] [nvarchar](4000) NULL,
	[CreatedDateTime] [datetime] NULL,
 CONSTRAINT [BooksAbstract__AbstractIdPK] PRIMARY KEY CLUSTERED 
(
	[AbstractIdPK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[books_sasurie]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[books_sasurie](
	[acc_no] [int] NULL,
	[acc_date] [datetime] NULL,
	[call_no] [nvarchar](50) NULL,
	[title] [nvarchar](100) NULL,
	[subtitle] [nvarchar](50) NULL,
	[authors] [nvarchar](50) NULL,
	[pname] [varchar](50) NULL,
	[pub_no] [int] NULL,
	[pplace] [nvarchar](50) NULL,
	[edition_type] [nvarchar](50) NULL,
	[etype] [nvarchar](50) NULL,
	[subject] [nvarchar](50) NULL,
	[size] [nvarchar](50) NULL,
	[keyword] [nvarchar](50) NULL,
	[iss_type] [nvarchar](50) NULL,
	[dcode] [nvarchar](3) NULL,
	[dept_no] [int] NULL,
	[bbillno] [nvarchar](50) NULL,
	[bbdate] [datetime] NULL,
	[price] [real] NULL,
	[pmode] [nvarchar](50) NULL,
	[pdetail] [nvarchar](50) NULL,
	[remarks] [nvarchar](50) NULL,
	[position] [nvarchar](50) NULL,
	[irstatus] [nvarchar](1) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [EBooks].[Books]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [EBooks].[Books](
	[BookId] [int] IDENTITY(1,1) NOT NULL,
	[TypeId] [tinyint] NOT NULL,
	[TypeStr]  AS (case [TypeId] when (1) then 'Books' when (2) then 'Non Books' when (3) then 'Periodicals' when (4) then 'Back Volumes' when (5) then 'E-Books'  end),
	[SubTypeId] [tinyint] NULL,
	[FileNames] [nvarchar](4000) NOT NULL,
	[Title] [nvarchar](2000) NULL,
	[Author] [nvarchar](2000) NULL,
	[PublisherId] [int] NULL,
	[YearOfPublishing] [smallint] NULL,
	[Price] [decimal](20, 2) NULL,
	[IsUploaded] [bit] NULL,
	[DeptId] [smallint] NULL,
	[CreatedUserId] [smallint] NULL,
	[Createddatetime] [datetime] NOT NULL,
	[MeterialType] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[BookPDFLinks]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookPDFLinks](
	[PDFLinkIDPK] [int] IDENTITY(1,1) NOT NULL,
	[PDFIdFk] [int] NOT NULL,
	[LibraryIdFk] [smallint] NOT NULL,
	[LocationIdFk] [smallint] NOT NULL,
	[AccnNo] [nvarchar](350) NOT NULL,
	[CreateDateTime] [datetime] NOT NULL,
 CONSTRAINT [BookPDFLinks__PDFLinkIDPK] PRIMARY KEY CLUSTERED 
(
	[PDFLinkIDPK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookPDF]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[BookPDF](
	[PDFIdPK] [int] IDENTITY(1,1) NOT NULL,
	[AbstractTypeIdFK] [tinyint] NOT NULL,
	[BookType] [int] NULL,
	[BookTypeName]  AS (case [BookType] when (1) then 'Book' when (2) then 'Serials' when (3) then 'Non - Book' when (4) then 'Back Volume'  end),
	[OFname] [varchar](50) NOT NULL,
	[Ext] [varchar](5) NOT NULL,
	[GenUID] [uniqueidentifier] NOT NULL,
	[GenFname] [varchar](50) NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [BookPDF__PDFIdPk] PRIMARY KEY CLUSTERED 
(
	[PDFIdPK] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [EBooks].[BookMaster]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [EBooks].[BookMaster](
	[BookMasterId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](2000) NOT NULL,
	[Author] [nvarchar](2000) NOT NULL,
	[Edition] [smallint] NULL,
	[YearOfPublishing] [smallint] NOT NULL,
	[PublisherId] [int] NULL,
	[Price] [decimal](20, 2) NULL,
	[DeptId] [smallint] NULL,
	[CoverPage] [int] NULL,
	[ContentPage] [int] NULL,
	[FullBook] [int] NULL,
	[PublisherDescription] [int] NULL,
	[CreatedUserId] [smallint] NULL,
	[Createddatetime] [datetime] NOT NULL,
 CONSTRAINT [pk__EBooks_BookMaster_id] PRIMARY KEY CLUSTERED 
(
	[BookMasterId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Book_vtx]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Book_vtx](
	[acc_no] [int] NULL,
	[call_no] [nvarchar](255) NULL,
	[Author] [nvarchar](255) NULL,
	[Title] [nvarchar](255) NULL,
	[book_size] [nvarchar](255) NULL,
	[Pages] [nvarchar](255) NULL,
	[Price] [float] NULL,
	[book_type] [nvarchar](255) NULL,
	[keywords] [nvarchar](255) NULL,
	[dept_no] [int] NULL,
	[location] [varchar](255) NULL,
	[pub_no] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_trans]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_trans](
	[id_no] [varchar](50) NULL,
	[acc_no] [nvarchar](50) NULL,
	[trans] [nvarchar](1) NULL,
	[t_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL,
	[other_date] [datetime] NULL,
	[issue_time] [varchar](50) NULL,
	[login_no] [int] NULL,
	[return_recon] [varchar](50) NULL,
	[recon_date] [datetime] NULL,
	[cancel_time] [varchar](50) NULL,
	[fine_cancel] [int] NULL,
	[login_cancel] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_title]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_title](
	[title] [varchar](250) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_subject]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_subject](
	[subject_name] [nvarchar](25) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_stat]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_stat](
	[lib_name] [nvarchar](50) NULL,
	[cat_name] [nvarchar](100) NULL,
	[no_volume] [int] NULL,
	[no_title] [int] NULL,
	[amt_vol] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_selvam]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_selvam](
	[acc_no] [int] NULL,
	[call_no] [nvarchar](255) NULL,
	[author] [nvarchar](255) NULL,
	[title] [nvarchar](255) NULL,
	[publisher] [nvarchar](255) NULL,
	[edition] [int] NULL,
	[isbn] [nvarchar](255) NULL,
	[page] [varchar](50) NULL,
	[price] [nvarchar](255) NULL,
	[remarks] [nvarchar](255) NULL,
	[dept_no] [int] NULL,
	[pub_no] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_script_lang]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_script_lang](
	[lib_no] [smallint] NULL,
	[acc_no] [int] NULL,
	[font_no] [smallint] NULL,
	[local_name] [nvarchar](20) NULL,
	[script_title] [nvarchar](250) NULL,
	[script_author] [nvarchar](250) NULL,
	[script_subtitle] [nvarchar](250) NULL,
	[script_publisher] [nvarchar](250) NULL,
	[script_edition] [int] NULL,
	[script_year] [smallint] NULL,
	[script_price] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_ret_log]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_ret_log](
	[lib_no] [smallint] NULL,
	[sl_no] [smallint] NULL,
	[acc_no] [int] NULL,
	[alert_date] [smalldatetime] NULL,
	[login_no] [smallint] NULL,
	[id_no] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_report]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_report](
	[rep_no] [smallint] NULL,
	[rep_name] [nvarchar](50) NULL,
	[file_path] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_parallel]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_parallel](
	[lib_no] [smallint] NULL,
	[acc_no] [int] NULL,
	[title_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[local_name] [nvarchar](100) NULL,
	[font_no] [smallint] NULL,
	[english_title] [nvarchar](250) NULL,
	[parallel_title] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_mkumaths]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_mkumaths](
	[call_no] [nvarchar](50) NULL,
	[title] [nvarchar](255) NULL,
	[plates] [nvarchar](50) NULL,
	[remarks] [nvarchar](50) NULL,
	[price] [int] NULL,
	[author] [varchar](100) NULL,
	[acc_no] [int] NULL,
	[pub_no] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_master_1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_master_1](
	[acc_no] [int] NULL,
	[title] [nvarchar](255) NULL,
	[sub_title] [nvarchar](255) NULL,
	[author] [nvarchar](255) NULL,
	[edition] [smallint] NULL,
	[pub_no] [smallint] NULL,
	[pub_year] [smallint] NULL,
	[price] [float] NULL,
	[price_name] [nvarchar](255) NULL,
	[convertion_rate] [nvarchar](255) NULL,
	[call_no] [nvarchar](255) NULL,
	[page] [varchar](53) NULL,
	[isbn] [nvarchar](255) NULL,
	[gift] [smallint] NULL,
	[gift_note] [nvarchar](255) NULL,
	[book_type] [nvarchar](255) NULL,
	[damaged] [smallint] NULL,
	[acc_date] [datetime] NULL,
	[keywords] [nvarchar](255) NULL,
	[remarks] [nvarchar](255) NULL,
	[dept_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[total_due] [int] NULL,
	[current_due] [int] NULL,
	[lost] [smallint] NULL,
	[avail] [smallint] NULL,
	[acc_type] [varchar](255) NULL,
	[ctrl_no] [nvarchar](255) NULL,
	[book_size] [nvarchar](255) NULL,
	[plates] [nvarchar](255) NULL,
	[subject] [nvarchar](255) NULL,
	[pur_details] [nvarchar](255) NULL,
	[lam_type] [nvarchar](255) NULL,
	[origin] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[trace_trans] [smallint] NULL,
	[location] [nvarchar](255) NULL,
	[dead] [smallint] NULL,
	[item_code] [nvarchar](255) NULL,
	[acad_info] [int] NULL,
	[return_alert] [smallint] NULL,
	[look_under] [nvarchar](255) NULL,
	[illustration] [nvarchar](255) NULL,
	[editor] [nvarchar](255) NULL,
	[issn] [nvarchar](255) NULL,
	[series_name] [varchar](50) NULL,
	[llib_no] [smallint] NULL,
	[subject_search] [nvarchar](255) NULL,
	[cont_page] [nvarchar](255) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_master](
	[acc_no] [int] NULL,
	[title] [nvarchar](255) NULL,
	[sub_title] [nvarchar](255) NULL,
	[author] [nvarchar](255) NULL,
	[edition] [smallint] NULL,
	[pub_no] [smallint] NULL,
	[pub_year] [smallint] NULL,
	[price] [float] NULL,
	[price_name] [nvarchar](255) NULL,
	[convertion_rate] [float] NULL,
	[call_no] [nvarchar](255) NULL,
	[page] [varchar](53) NULL,
	[isbn] [nvarchar](255) NULL,
	[gift] [smallint] NULL,
	[gift_note] [nvarchar](255) NULL,
	[book_type] [nvarchar](255) NULL,
	[damaged] [smallint] NULL,
	[acc_date] [datetime] NULL,
	[keywords] [nvarchar](255) NULL,
	[remarks] [nvarchar](255) NULL,
	[dept_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[total_due] [int] NULL,
	[current_due] [int] NULL,
	[lost] [smallint] NULL,
	[avail] [smallint] NULL,
	[acc_type] [varchar](255) NULL,
	[ctrl_no] [nvarchar](255) NULL,
	[book_size] [nvarchar](255) NULL,
	[plates] [nvarchar](255) NULL,
	[subject] [nvarchar](255) NULL,
	[pur_details] [nvarchar](255) NULL,
	[lam_type] [nvarchar](255) NULL,
	[origin] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[trace_trans] [smallint] NULL,
	[location] [nvarchar](255) NULL,
	[dead] [smallint] NULL,
	[item_code] [nvarchar](255) NULL,
	[acad_info] [int] NULL,
	[return_alert] [smallint] NULL,
	[look_under] [nvarchar](255) NULL,
	[illustration] [nvarchar](255) NULL,
	[editor] [nvarchar](255) NULL,
	[issn] [nvarchar](255) NULL,
	[series_name] [varchar](50) NULL,
	[llib_no] [smallint] NULL,
	[subject_search] [smallint] NULL,
	[cont_page] [nvarchar](255) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_mark]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_mark](
	[lib_no] [smallint] NULL,
	[acc_no] [nvarchar](50) NULL,
	[notes] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_links]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_links](
	[lib_no] [smallint] NULL,
	[acc_no] [nvarchar](50) NULL,
	[link_acc_no] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_latest]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_latest](
	[lib_no] [smallint] NULL,
	[acc_no] [int] NULL,
	[pur_date] [smalldatetime] NULL,
	[avail_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_gct]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_gct](
	[acc_no] [varchar](50) NULL,
	[price] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_content]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_content](
	[lib_no] [smallint] NULL,
	[acc_no] [int] NULL,
	[content_text] [nvarchar](2500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_clips]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_clips](
	[acc_no] [int] NULL,
	[clip_type] [varchar](11) NULL,
	[chap_no] [int] NULL,
	[page_no] [smallint] NULL,
	[remarks] [varchar](100) NULL,
	[image_file] [image] NULL,
	[img_name] [varchar](30) NULL,
	[img_no] [smallint] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_circle]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_circle](
	[id_no] [nvarchar](20) NULL,
	[acc_no] [nvarchar](50) NULL,
	[due_date] [smalldatetime] NULL,
	[due_times] [smallint] NULL,
	[login_no] [smallint] NULL,
	[t_date] [smalldatetime] NULL,
	[card_no] [nvarchar](40) NULL,
	[lib_no] [smallint] NULL,
	[issue_time] [varchar](50) NULL,
	[return_recon] [varchar](50) NULL,
	[recon_date] [datetime] NULL,
	[cancel_time] [varchar](50) NULL,
	[fine_cancel] [int] NULL,
	[login_cancel] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book_bind_spend]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_bind_spend](
	[lib_no] [int] NULL,
	[grant_no] [int] NULL,
	[sanc_no] [int] NULL,
	[book_bind_no] [int] NULL,
	[binder_no] [int] NULL,
	[pay_no] [int] NULL,
	[pay_date] [smalldatetime] NULL,
	[pay_amt] [float] NULL,
	[paymode] [nvarchar](50) NULL,
	[draft_name] [nvarchar](50) NULL,
	[draft_no] [nvarchar](50) NULL,
	[draft_charge] [int] NULL,
	[draft_date] [smalldatetime] NULL,
	[bank_name] [nvarchar](50) NULL,
	[bank_branch] [nvarchar](50) NULL,
	[voc_no] [int] NULL,
	[voc_date] [smalldatetime] NULL,
	[remarks] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_bind_ret]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_bind_ret](
	[lib_no] [smallint] NULL,
	[book_bind_no] [int] NULL,
	[acc_no] [int] NULL,
	[delivered_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_bind_det]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_bind_det](
	[lib_no] [smallint] NULL,
	[book_bind_no] [int] NULL,
	[acc_no] [int] NULL,
	[rate_book] [float] NULL,
	[delivery_date] [smalldatetime] NULL,
	[is_delivered] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_bind]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_bind](
	[grant_no] [smallint] NULL,
	[sanc_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[book_bind_no] [int] NULL,
	[bind_date] [smalldatetime] NULL,
	[bind_no] [smallint] NULL,
	[no_book] [int] NULL,
	[total_amt] [float] NULL,
	[discount_amt] [float] NULL,
	[net_amt] [float] NULL,
	[paid_amt] [float] NULL,
	[delivery_date] [smalldatetime] NULL,
	[no_book_ret] [int] NULL,
	[bind_info] [nvarchar](250) NULL,
	[remarks] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book_1](
	[acc_no] [int] NULL,
	[title] [nvarchar](250) NULL,
	[sub_title] [varchar](100) NULL,
	[author] [nvarchar](250) NULL,
	[edition] [smallint] NULL,
	[pub_no] [smallint] NULL,
	[pub_year] [smallint] NULL,
	[price] [float] NULL,
	[price_name] [nvarchar](20) NULL,
	[convertion_rate] [float] NULL,
	[call_no] [nvarchar](50) NULL,
	[page] [varchar](10) NULL,
	[isbn] [nvarchar](20) NULL,
	[gift] [smallint] NULL,
	[gift_note] [nvarchar](250) NULL,
	[book_type] [nvarchar](1) NULL,
	[damaged] [smallint] NULL,
	[acc_date] [datetime] NULL,
	[keywords] [nvarchar](250) NULL,
	[remarks] [nvarchar](250) NULL,
	[dept_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[total_due] [int] NULL,
	[current_due] [int] NULL,
	[lost] [smallint] NULL,
	[avail] [smallint] NULL,
	[acc_type] [nvarchar](25) NULL,
	[ctrl_no] [nvarchar](15) NULL,
	[book_size] [nvarchar](10) NULL,
	[plates] [nvarchar](25) NULL,
	[subject] [nvarchar](25) NULL,
	[pur_details] [nvarchar](100) NULL,
	[lam_type] [nvarchar](50) NULL,
	[origin] [nvarchar](100) NULL,
	[country] [nvarchar](1) NULL,
	[trace_trans] [smallint] NULL,
	[location] [nvarchar](250) NULL,
	[dead] [smallint] NULL,
	[item_code] [nvarchar](10) NULL,
	[acad_info] [int] NULL,
	[return_alert] [smallint] NULL,
	[look_under] [nvarchar](100) NULL,
	[illustration] [nvarchar](250) NULL,
	[editor] [nvarchar](250) NULL,
	[issn] [nvarchar](50) NULL,
	[series_name] [nvarchar](100) NULL,
	[llib_no] [smallint] NULL,
	[subject_search] [smallint] NULL,
	[cont_page] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[book]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[book](
	[acc_no] [int] NULL,
	[title] [nvarchar](300) NULL,
	[sub_title] [varchar](100) NULL,
	[author] [nvarchar](250) NULL,
	[edition] [int] NULL,
	[pub_no] [smallint] NULL,
	[pub_year] [int] NULL,
	[price] [int] NULL,
	[price_name] [nvarchar](20) NULL,
	[convertion_rate] [float] NULL,
	[call_no] [nvarchar](50) NULL,
	[page] [varchar](10) NULL,
	[isbn] [nvarchar](20) NULL,
	[gift] [smallint] NULL,
	[gift_note] [nvarchar](250) NULL,
	[book_type] [nvarchar](1) NULL,
	[damaged] [smallint] NULL,
	[acc_date] [datetime] NULL,
	[keywords] [nvarchar](250) NULL,
	[remarks] [nvarchar](250) NULL,
	[dept_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[total_due] [int] NULL,
	[current_due] [int] NULL,
	[lost] [smallint] NULL,
	[avail] [smallint] NULL,
	[acc_type] [nvarchar](25) NULL,
	[ctrl_no] [nvarchar](15) NULL,
	[book_size] [nvarchar](10) NULL,
	[plates] [nvarchar](25) NULL,
	[subject] [nvarchar](25) NULL,
	[pur_details] [nvarchar](100) NULL,
	[lam_type] [nvarchar](50) NULL,
	[origin] [nvarchar](100) NULL,
	[country] [nvarchar](1) NULL,
	[trace_trans] [smallint] NULL,
	[location] [nvarchar](250) NULL,
	[dead] [smallint] NULL,
	[item_code] [nvarchar](10) NULL,
	[acad_info] [int] NULL,
	[return_alert] [smallint] NULL,
	[look_under] [nvarchar](100) NULL,
	[illustration] [nvarchar](250) NULL,
	[editor] [nvarchar](250) NULL,
	[issn] [nvarchar](50) NULL,
	[series_name] [nvarchar](100) NULL,
	[llib_no] [smallint] NULL,
	[subject_search] [smallint] NULL,
	[cont_page] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[blend_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[blend_master](
	[blend] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[binder_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[binder_master](
	[bind_no] [smallint] NULL,
	[bind_name] [nvarchar](100) NULL,
	[prop_name] [nvarchar](60) NULL,
	[bind_address] [nvarchar](250) NULL,
	[phone_no] [nvarchar](50) NULL,
	[intro_date] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bill_payment]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bill_payment](
	[grant_no] [smallint] NULL,
	[sanc_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[trans_no] [int] NULL,
	[trans_date] [smalldatetime] NULL,
	[pay_mode] [nvarchar](1) NULL,
	[paid_amt] [float] NULL,
	[ctrl_no] [int] NULL,
	[draft_name] [nvarchar](10) NULL,
	[draft_no] [nvarchar](20) NULL,
	[draft_date] [smalldatetime] NULL,
	[draft_amt] [float] NULL,
	[com_amt] [float] NULL,
	[bank_name] [nvarchar](50) NULL,
	[bank_branch] [nvarchar](30) NULL,
	[remarks] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bill_details]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bill_details](
	[ctrl_no] [int] NULL,
	[acc_no] [int] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bill_book]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bill_book](
	[ctrl_no] [int] NULL,
	[bill_no] [varchar](10) NULL,
	[bill_date] [datetime] NULL,
	[bill_amt] [float] NULL,
	[discount] [float] NULL,
	[tax_amt] [float] NULL,
	[pur_year] [varchar](20) NULL,
	[lib_no] [smallint] NULL,
	[grant_no] [smallint] NULL,
	[sanc_no] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[vendor_no] [smallint] NULL,
	[deliver_date] [datetime] NULL,
	[paid_amt] [float] NULL,
	[no_books] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[backup_details]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[backup_details](
	[path] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[back_volume]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[back_volume](
	[lib_no] [int] NULL,
	[short_code] [varchar](50) NULL,
	[sl_no] [int] NULL,
	[vol_code] [varchar](50) NULL,
	[vol_title] [varchar](50) NULL,
	[vol_desc] [varchar](50) NULL,
	[subject] [varchar](50) NULL,
	[pub_no] [int] NULL,
	[acc_date] [datetime] NULL,
	[price] [float] NULL,
	[price_name] [varchar](50) NULL,
	[conversion_rate] [varchar](50) NULL,
	[damage] [tinyint] NULL,
	[avail] [tinyint] NULL,
	[lang_no] [smallint] NULL,
	[llib_no] [int] NULL,
	[dept_no] [int] NULL,
	[no_leaves] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[back_vol_leaf]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[back_vol_leaf](
	[vol_code] [nvarchar](20) NULL,
	[issue_code] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[address_list]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[address_list](
	[person_name] [varchar](100) NULL,
	[identify] [varchar](100) NULL,
	[address] [varchar](250) NULL,
	[phone] [varchar](150) NULL,
	[e_mail] [varchar](250) NULL,
	[remarks] [varchar](250) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AbstractType]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[AbstractType](
	[AbstractTypeIdPk] [tinyint] NOT NULL,
	[Abstract_TypeDescription] [varchar](50) NULL,
	[IsListed] [bit] NULL,
	[IsActive] [bit] NULL,
	[SqlUserId] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[MailGroup]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MailGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar](1000) NOT NULL,
	[CreatedUserId] [int] NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [pk__MailGroups_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [uk__MailGroups_GroupName] UNIQUE NONCLUSTERED 
(
	[GroupName] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mail_settings]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mail_settings](
	[ins_name] [nvarchar](100) NULL,
	[ins_mailid] [nvarchar](100) NULL,
	[smtp_host] [nvarchar](100) NULL,
	[inter_user] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mail_manage]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mail_manage](
	[msg_no] [smallint] NULL,
	[msg_sub] [nvarchar](50) NULL,
	[msg_from] [nvarchar](50) NULL,
	[msg_detail] [nvarchar](250) NULL,
	[msg_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mail_alert]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mail_alert](
	[id_no] [nvarchar](20) NULL,
	[msg_date] [smalldatetime] NULL,
	[msg_no] [smallint] NULL,
	[msg_subject] [nvarchar](50) NULL,
	[msg_from] [nvarchar](60) NULL,
	[msg_detail] [nvarchar](250) NULL,
	[is_new] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lost]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lost](
	[acc_no] [int] NULL,
	[id_no] [nvarchar](50) NULL,
	[lost_date] [smalldatetime] NULL,
	[lib_no] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[login_library]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[login_library](
	[login_no] [smallint] NULL,
	[llib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[login]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[login](
	[login_no] [smallint] NULL,
	[login_name] [nvarchar](20) NULL,
	[pass_word] [nvarchar](40) NULL,
	[lib_no] [smallint] NULL,
	[supervisor] [smallint] NULL,
	[public_service] [smallint] NULL,
	[transactions] [smallint] NULL,
	[periodicals] [smallint] NULL,
	[acquisition] [smallint] NULL,
	[stock] [smallint] NULL,
	[reports] [smallint] NULL,
	[backup_manager] [smallint] NULL,
	[locked] [smallint] NULL,
	[expire_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[llib_personal]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[llib_personal](
	[llib_no] [smallint] NULL,
	[id_no] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[library_visits]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[library_visits](
	[lib_no] [smallint] NULL,
	[visit_date] [datetime] NULL,
	[member_count] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[library_location]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[library_location](
	[llib_no] [smallint] NULL,
	[llib_name] [nvarchar](100) NULL,
	[llibrarian] [nvarchar](50) NULL,
	[lasst_librarian] [nvarchar](50) NULL,
	[llocation] [nvarchar](100) NULL,
	[lshort_code] [nvarchar](1) NULL,
	[lclass_code] [nvarchar](100) NULL,
	[llib_dimen] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[library_card]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[library_card](
	[id_no] [nvarchar](20) NULL,
	[card_no] [nvarchar](40) NULL,
	[used] [smallint] NULL,
	[lib_no] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[library]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[library](
	[lib_no] [smallint] NULL,
	[lib_name] [nvarchar](100) NULL,
	[librarian] [nvarchar](50) NULL,
	[asst_librarian] [nvarchar](50) NULL,
	[location] [nvarchar](100) NULL,
	[sec_code] [nvarchar](2) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lib_rules]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lib_rules](
	[lib_no] [smallint] NULL,
	[lib_rules] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lib_personal]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lib_personal](
	[lib_no] [smallint] NULL,
	[id_no] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[language]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[language](
	[lang_no] [smallint] NULL,
	[lang_name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[institute]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[institute](
	[institute_name] [nvarchar](60) NULL,
	[address1] [nvarchar](50) NULL,
	[address2] [nvarchar](50) NULL,
	[address3] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[indent_rec]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[indent_rec](
	[indent_no] [int] NULL,
	[indent_date] [smalldatetime] NULL,
	[id_no] [nvarchar](50) NULL,
	[lib_no] [smallint] NULL,
	[mat_type] [nvarchar](1) NULL,
	[mat_title] [nvarchar](250) NULL,
	[mat_author] [nvarchar](250) NULL,
	[processed] [smallint] NULL,
	[Remarks] [nvarchar](50) NULL,
	[selected] [smallint] NULL,
	[purchased] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[impres_login]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[impres_login](
	[login_no] [smallint] NULL,
	[login_name] [nvarchar](20) NULL,
	[login_pass] [nvarchar](40) NULL,
	[expire_date] [smalldatetime] NULL,
	[login_lock] [smallint] NULL,
	[super] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[image_clip]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[image_clip](
	[clip_no] [int] NULL,
	[clip_source] [varchar](100) NULL,
	[source_date] [datetime] NULL,
	[keywords] [varchar](250) NULL,
	[remarks] [varchar](100) NULL,
	[clip_image] [image] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[holiday]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[holiday](
	[holy_date] [smalldatetime] NULL,
	[holy_reason] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hanger_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[hanger_master](
	[short_code] [varchar](1) NULL,
	[sl_no] [int] NULL,
	[acc_no] [varchar](50) NULL,
	[item_no] [varchar](50) NULL,
	[acc_date] [smalldatetime] NULL,
	[buyer_name] [varchar](50) NULL,
	[coding] [varchar](50) NULL,
	[description] [varchar](50) NULL,
	[tc_count] [varchar](20) NULL,
	[construction] [varchar](20) NULL,
	[weave] [varchar](50) NULL,
	[blend] [varchar](50) NULL,
	[category] [varchar](50) NULL,
	[colour] [varchar](20) NULL,
	[processing] [varchar](50) NULL,
	[sp_finish] [varchar](50) NULL,
	[embelish] [varchar](50) NULL,
	[rack_no] [varchar](5) NULL,
	[shelf_no] [varchar](5) NULL,
	[remarks] [varchar](100) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[grant_sanction]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grant_sanction](
	[grant_no] [smallint] NULL,
	[sanc_no] [smallint] NULL,
	[sanc_date] [smalldatetime] NULL,
	[sanc_year] [nvarchar](11) NULL,
	[sanc_amt] [float] NULL,
	[amt_allot] [float] NULL,
	[amt_blocked] [float] NULL,
	[amt_used] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grant_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grant_master](
	[grant_no] [smallint] NULL,
	[grant_name] [nvarchar](50) NULL,
	[short_code] [nvarchar](5) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Func].[FunctionDetails]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Func].[FunctionDetails](
	[FuncId] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](2000) NOT NULL,
	[ShortName] [nvarchar](2000) NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NULL,
	[Venue] [nvarchar](2000) NULL,
	[FunctionType] [nvarchar](2000) NULL,
	[FromTime] [nvarchar](20) NULL,
	[ToTime] [nvarchar](20) NULL,
	[KeyWord] [nvarchar](1000) NULL,
	[Remark] [nvarchar](1000) NULL,
	[CreatedUserId] [smallint] NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [pk__FunctionDetails_FinancialYearId] PRIMARY KEY CLUSTERED 
(
	[FuncId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[font_list]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[font_list](
	[font_no] [smallint] NULL,
	[local_name] [nvarchar](20) NULL,
	[font_name] [nvarchar](100) NULL,
	[font_style] [smallint] NULL,
	[font_size] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[flash_notice]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[flash_notice](
	[lib_no] [smallint] NULL,
	[notice_date] [smalldatetime] NULL,
	[notice_board] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fine_slab]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fine_slab](
	[lib_no] [smallint] NULL,
	[day_from] [smallint] NULL,
	[day_to] [smallint] NULL,
	[day_amt] [float] NULL,
	[cat_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fine_receipt1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[fine_receipt1](
	[llib_no] [int] NULL,
	[sno] [int] NULL,
	[rec_no] [int] NULL,
	[id_no] [nvarchar](20) NULL,
	[acc_no] [int] NULL,
	[rec_date] [smalldatetime] NULL,
	[rec_amt] [float] NULL,
	[paid] [int] NULL,
	[remarks] [nvarchar](100) NULL,
	[lib_no] [int] NULL,
	[paid_date] [smalldatetime] NULL,
	[issue_date] [datetime] NULL,
	[due_date] [datetime] NULL,
	[noday] [smallint] NULL,
	[login_no] [int] NULL,
	[reconcilation] [varchar](50) NULL,
	[fine_cancel] [int] NULL,
	[recon_date] [datetime] NULL,
	[cancel_time] [varchar](50) NULL,
	[login_cancel] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[fine_receipt]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[fine_receipt](
	[rec_no] [int] NULL,
	[id_no] [varchar](20) NULL,
	[acc_no] [varchar](20) NULL,
	[rec_date] [datetime] NULL,
	[rec_amt] [float] NULL,
	[paid] [tinyint] NULL,
	[remarks] [varchar](50) NULL,
	[lib_no] [smallint] NULL,
	[paid_date] [datetime] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[file_manage]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[file_manage](
	[file_no] [smallint] NULL,
	[file_title] [nvarchar](100) NULL,
	[file_date] [nvarchar](15) NULL,
	[file_identity] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[file_leaf]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[file_leaf](
	[file_no] [smallint] NULL,
	[leaf_no] [smallint] NULL,
	[leaf_content] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[failed_issues]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[failed_issues](
	[serial_name] [varchar](55) NULL,
	[issue_info] [varchar](25) NULL,
	[pub_info1] [varchar](50) NULL,
	[pub_info2] [varchar](50) NULL,
	[pub_info3] [varchar](50) NULL,
	[pub_info4] [varchar](50) NULL,
	[institute_name] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ent_reg_others]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ent_reg_others](
	[name] [nvarchar](40) NULL,
	[designation] [nvarchar](20) NULL,
	[organisation] [nvarchar](50) NULL,
	[in_date] [smalldatetime] NULL,
	[out_date] [smalldatetime] NULL,
	[active] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ent_reg]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ent_reg](
	[id_no] [nvarchar](20) NULL,
	[in_date] [smalldatetime] NULL,
	[out_date] [smalldatetime] NULL,
	[active] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[in_time] [smalldatetime] NULL,
	[out_time] [smalldatetime] NULL,
	[lib_no] [int] NULL,
	[trans] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[edition]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[edition](
	[acc_no] [int] NULL,
	[edition] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[due_list_temp]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[due_list_temp](
	[id_no] [nvarchar](10) NULL,
	[name] [nvarchar](50) NULL,
	[pat_no] [nvarchar](50) NULL,
	[pat_detail] [nvarchar](250) NULL,
	[due_date] [smalldatetime] NULL,
	[over_due_period] [int] NULL,
	[fine_amt] [float] NULL,
	[computer_name] [nvarchar](50) NULL,
	[mat_no] [smallint] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [EBooks].[Department_Digitel]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [EBooks].[Department_Digitel](
	[DeptId] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](2000) NOT NULL,
	[Createddatetime] [datetime] NOT NULL,
 CONSTRAINT [pk__EBooks_Department_Digitel_DeptId] PRIMARY KEY CLUSTERED 
(
	[DeptId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[department]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[department](
	[dept_no] [smallint] NULL,
	[dept_name] [nvarchar](100) NULL,
	[dept_head] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cust_book_cond]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cust_book_cond](
	[dept_no] [smallint] NULL,
	[sl_no] [smallint] NULL,
	[field_name] [nvarchar](20) NULL,
	[field_value] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[current_year]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[current_year](
	[sno] [smallint] NULL,
	[first_date] [smalldatetime] NULL,
	[last_date] [smalldatetime] NULL,
	[active] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[currency_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[currency_master](
	[price_name] [nvarchar](20) NULL,
	[valid_date] [smalldatetime] NULL,
	[irv] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[controls]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[controls](
	[ena_reserve] [smallint] NULL,
	[skip_sunday] [smallint] NULL,
	[veri_pass] [smallint] NULL,
	[add_receipt] [smallint] NULL,
	[ena_web] [smallint] NULL,
	[follow_class] [smallint] NULL,
	[allow_mass] [smallint] NULL,
	[log_history] [smallint] NULL,
	[multi_lang] [smallint] NULL,
	[dis_remain] [smallint] NULL,
	[browse_dues] [smallint] NULL,
	[adv_acquistion] [smallint] NULL,
	[accept_indent] [smallint] NULL,
	[ena_export] [smallint] NULL,
	[adv_modules] [smallint] NULL,
	[server_date] [smallint] NULL,
	[circle_photo] [smallint] NULL,
	[view_port] [smallint] NULL,
	[autoadd_lib] [smallint] NULL,
	[search_dir] [smallint] NULL,
	[fine_slab] [smallint] NULL,
	[circle_scanner] [smallint] NULL,
	[circle_option] [smallint] NULL,
	[pass_default] [nvarchar](50) NULL,
	[list_author] [smallint] NULL,
	[circle_showid] [smallint] NULL,
	[circle_ret_after] [smallint] NULL,
	[prompt_card] [smallint] NULL,
	[lock_catagory] [smallint] NULL,
	[disable_skipfine] [smallint] NULL,
	[log_hits] [smallint] NULL,
	[log_failkeys] [smallint] NULL,
	[list_callno] [smallint] NULL,
	[draft_print] [smallint] NULL,
	[print_preview] [smallint] NULL,
	[display_borrower] [smallint] NULL,
	[search_also_sub] [smallint] NULL,
	[allow_compose_mail] [smallint] NULL,
	[auto_alert_mail] [smallint] NULL,
	[disp_photo_view] [smallint] NULL,
	[ena_animation] [smallint] NULL,
	[skip_holiday] [smallint] NULL,
	[upper_case] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[construction_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[construction_master](
	[construction] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[colour_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[colour_master](
	[colour] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[classification]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[classification](
	[tree_level] [smallint] NULL,
	[parent_code] [varchar](100) NULL,
	[class_code] [varchar](100) NULL,
	[descr] [varchar](100) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[class2]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[class2](
	[level1] [nvarchar](5) NULL,
	[level2] [nvarchar](20) NULL,
	[class_description] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[class1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[class1](
	[level1] [nvarchar](5) NULL,
	[class_description] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[circle_note]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[circle_note](
	[id_no] [nvarchar](50) NULL,
	[acc_no] [nvarchar](50) NULL,
	[message] [nvarchar](250) NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trans_history]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trans_history](
	[id_no] [nvarchar](20) NULL,
	[mat_no] [nvarchar](30) NULL,
	[issue_date] [smalldatetime] NULL,
	[ret_date] [smalldatetime] NULL,
	[remarks] [nvarchar](20) NULL,
	[mat_type] [nvarchar](1) NULL,
	[lib_no] [smallint] NULL,
	[dept_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[temp_verify_stock]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp_verify_stock](
	[verify_no] [int] NULL,
	[volavail] [int] NULL,
	[volcharge] [int] NULL,
	[totlost] [int] NULL,
	[curlost] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[temp_top_user_all]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_top_user_all](
	[computer_name] [varchar](50) NULL,
	[id_no] [varchar](50) NULL,
	[top_user_all] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_top_user]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_top_user](
	[computer_name] [varchar](50) NULL,
	[id_no] [varchar](50) NULL,
	[top_user] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_subscrib_details]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_subscrib_details](
	[computer_name] [varchar](50) NULL,
	[s_code] [varchar](50) NULL,
	[dd_no] [varchar](50) NULL,
	[dd_date] [smalldatetime] NULL,
	[dd_amt] [float] NULL,
	[f_issue] [smalldatetime] NULL,
	[l_issue] [smalldatetime] NULL,
	[s_term] [int] NULL,
	[f_issuedate] [smalldatetime] NULL,
	[l_issuedate] [smalldatetime] NULL,
	[f_issueno] [int] NULL,
	[f_vol] [nvarchar](50) NULL,
	[f_volno] [int] NULL,
	[l_issueno] [int] NULL,
	[l_vol] [nvarchar](50) NULL,
	[l_volno] [int] NULL,
	[title] [varchar](100) NULL,
	[period_no] [int] NULL,
	[s_type] [varchar](1) NULL,
	[dept_no] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_serial1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_serial1](
	[computer_name] [nvarchar](50) NULL,
	[lib_no] [smallint] NULL,
	[slno] [smallint] NULL,
	[serial_group] [nvarchar](50) NULL,
	[edition_group] [nvarchar](50) NULL,
	[period_group] [nvarchar](50) NULL,
	[period_count] [smallint] NULL,
	[acq_type] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_serial_statistics]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_serial_statistics](
	[computer_name] [varchar](50) NULL,
	[lib_no] [smallint] NULL,
	[slno] [smallint] NULL,
	[serial_group] [varchar](50) NULL,
	[edition_group] [varchar](50) NULL,
	[period_group] [varchar](50) NULL,
	[period_count] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_serial]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_serial](
	[computer_name] [varchar](30) NULL,
	[lib_no] [smallint] NULL,
	[slno] [smallint] NULL,
	[serial_group] [varchar](30) NULL,
	[edition_group] [varchar](30) NULL,
	[period_group] [varchar](30) NULL,
	[period_count] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Temp_period_rem]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Temp_period_rem](
	[period_no] [smallint] NULL,
	[period_name] [varchar](15) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_max_user]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_max_user](
	[computer_name] [varchar](50) NULL,
	[id_no] [varchar](50) NULL,
	[max_user] [int] NULL,
	[mat_type] [varchar](1) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_issues_stat]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_issues_stat](
	[computer_name] [varchar](50) NULL,
	[receive_status] [varchar](50) NULL,
	[no_cnt] [int] NULL,
	[s_code] [varchar](50) NULL,
	[s_term] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_issues]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_issues](
	[computer_name] [varchar](50) NULL,
	[s_code] [varchar](50) NULL,
	[issue_no] [int] NULL,
	[i_date] [smalldatetime] NULL,
	[r_date] [smalldatetime] NULL,
	[volume] [nvarchar](10) NULL,
	[vol_num] [int] NULL,
	[price] [float] NULL,
	[avail] [smallint] NULL,
	[s_term] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Temp_failed_issues]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Temp_failed_issues](
	[computer_name] [varchar](50) NULL,
	[s_code] [varchar](10) NULL,
	[issue_details] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_ent]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_ent](
	[id_no] [varchar](50) NULL,
	[trans] [varchar](1) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_chart]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp_chart](
	[group_name1] [nvarchar](50) NULL,
	[group_name2] [nvarchar](50) NULL,
	[group_value] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[temp_book_stat]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[temp_book_stat](
	[computer_name] [varchar](80) NULL,
	[period_no] [smallint] NULL,
	[period_name] [varchar](40) NULL,
	[dept_name] [varchar](80) NULL,
	[book_volume] [int] NULL,
	[type] [varchar](80) NULL,
	[edition] [varchar](80) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[temp_book_cust]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[temp_book_cust](
	[computer_name] [nvarchar](50) NULL,
	[lib_no] [smallint] NULL,
	[acc_no] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tamil_heading]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tamil_heading](
	[institute_name] [nvarchar](100) NULL,
	[institute_location] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tamil_book]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tamil_book](
	[acc_no] [int] NULL,
	[title] [nvarchar](250) NULL,
	[sub_title] [nvarchar](250) NULL,
	[author] [nvarchar](250) NULL,
	[font_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[subscrib1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[subscrib1](
	[s_code] [nvarchar](20) NULL,
	[s_term] [smallint] NULL,
	[dd_no] [nvarchar](20) NULL,
	[dd_date] [smalldatetime] NULL,
	[dd_post] [smalldatetime] NULL,
	[dd_amt] [float] NULL,
	[dd_comm] [float] NULL,
	[favour] [nvarchar](100) NULL,
	[bank] [nvarchar](100) NULL,
	[place] [nvarchar](50) NULL,
	[sent_date] [smalldatetime] NULL,
	[purchaser] [nvarchar](50) NULL,
	[inst_mem] [smallint] NULL,
	[sub_period] [int] NULL,
	[rec_date] [smalldatetime] NULL,
	[f_issue] [smalldatetime] NULL,
	[l_issue] [smalldatetime] NULL,
	[f_date] [smalldatetime] NULL,
	[l_date] [smalldatetime] NULL,
	[active] [smallint] NULL,
	[confirm_received] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[subscrib]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[subscrib](
	[s_code] [nvarchar](20) NULL,
	[s_term] [smallint] NULL,
	[dd_no] [nvarchar](20) NULL,
	[dd_date] [smalldatetime] NULL,
	[dd_post] [smalldatetime] NULL,
	[dd_amt] [float] NULL,
	[dd_comm] [float] NULL,
	[favour] [nvarchar](100) NULL,
	[bank] [nvarchar](100) NULL,
	[place] [nvarchar](50) NULL,
	[sent_date] [smalldatetime] NULL,
	[purchaser] [nvarchar](50) NULL,
	[inst_mem] [smallint] NULL,
	[sub_period] [int] NULL,
	[rec_date] [smalldatetime] NULL,
	[f_issue] [smalldatetime] NULL,
	[l_issue] [smalldatetime] NULL,
	[f_date] [smalldatetime] NULL,
	[l_date] [smalldatetime] NULL,
	[active] [smallint] NULL,
	[confirm_received] [smallint] NULL,
	[sub_no] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[student]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[student](
	[stu_name] [nvarchar](50) NULL,
	[stu_sex] [nvarchar](1) NULL,
	[stu_idno] [nvarchar](50) NULL,
	[dept_no] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[stock_missed]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stock_missed](
	[verify_no] [int] NULL,
	[acc_no] [int] NULL,
	[id_no] [nvarchar](50) NULL,
	[lost_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sheet1$]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sheet1$](
	[Accn# No#] [float] NULL,
	[CL# No#] [nvarchar](255) NULL,
	[AUTHOR] [nvarchar](255) NULL,
	[TITLE] [nvarchar](255) NULL,
	[PUBLISHER] [nvarchar](255) NULL,
	[Edition & Year] [float] NULL,
	[ISBN] [nvarchar](255) NULL,
	[Pages] [float] NULL,
	[Price] [float] NULL,
	[Remarks] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[serials1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serials1](
	[s_code] [nvarchar](20) NULL,
	[title] [nvarchar](250) NULL,
	[sub_title] [nvarchar](250) NULL,
	[for_title] [nvarchar](250) NULL,
	[f_issue] [smalldatetime] NULL,
	[l_issue] [smalldatetime] NULL,
	[period_no] [smallint] NULL,
	[pub_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[a_status] [nvarchar](1) NULL,
	[g_period] [smallint] NULL,
	[s_type] [nvarchar](1) NULL,
	[issn_no] [nvarchar](50) NULL,
	[sub_no] [nvarchar](50) NULL,
	[vendor_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[edition] [nvarchar](10) NULL,
	[short_code] [nvarchar](5) NULL,
	[sl_no] [smallint] NULL,
	[is_active] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[serials]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[serials](
	[s_code] [varchar](50) NULL,
	[title] [nvarchar](250) NULL,
	[sub_title] [nvarchar](250) NULL,
	[for_title] [nvarchar](250) NULL,
	[f_issue] [smalldatetime] NULL,
	[l_issue] [smalldatetime] NULL,
	[period_no] [smallint] NULL,
	[pub_no] [smallint] NULL,
	[lang_no] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[a_status] [nvarchar](1) NULL,
	[g_period] [smallint] NULL,
	[s_type] [nvarchar](1) NULL,
	[issn_no] [nvarchar](50) NULL,
	[sub_no] [nvarchar](50) NULL,
	[vendor_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[edition] [nvarchar](10) NULL,
	[short_code] [nvarchar](5) NULL,
	[sl_no] [smallint] NULL,
	[is_active] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[serial_trans]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serial_trans](
	[id_no] [nvarchar](20) NULL,
	[issue_code] [nvarchar](30) NULL,
	[trans] [nvarchar](1) NULL,
	[t_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL,
	[other_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[serial_issues1]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serial_issues1](
	[s_code] [nvarchar](20) NULL,
	[issue_no] [smallint] NULL,
	[i_date] [smalldatetime] NULL,
	[r_date] [smalldatetime] NULL,
	[avail] [smallint] NULL,
	[page] [smallint] NULL,
	[damage] [smallint] NULL,
	[price] [float] NULL,
	[volume] [nvarchar](25) NULL,
	[vol_num] [smallint] NULL,
	[Bundle_cnt] [smallint] NULL,
	[subject] [nvarchar](50) NULL,
	[issue_code] [nvarchar](30) NULL,
	[s_term] [smallint] NULL,
	[plates] [nvarchar](25) NULL,
	[item_code] [nvarchar](10) NULL,
	[back_volume] [smallint] NULL,
	[llib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[serial_issues]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[serial_issues](
	[s_code] [varchar](50) NULL,
	[issue_no] [smallint] NULL,
	[i_date] [smalldatetime] NULL,
	[r_date] [smalldatetime] NULL,
	[avail] [smallint] NULL,
	[page] [smallint] NULL,
	[damage] [smallint] NULL,
	[price] [float] NULL,
	[volume] [nvarchar](25) NULL,
	[vol_num] [smallint] NULL,
	[Bundle_cnt] [smallint] NULL,
	[subject] [nvarchar](50) NULL,
	[issue_code] [nvarchar](30) NULL,
	[s_term] [smallint] NULL,
	[plates] [nvarchar](100) NULL,
	[item_code] [nvarchar](10) NULL,
	[back_volume] [smallint] NULL,
	[llib_no] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[serial_circle]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serial_circle](
	[id_no] [nvarchar](20) NULL,
	[issue_code] [nvarchar](30) NULL,
	[due_date] [smalldatetime] NULL,
	[due_times] [smallint] NULL,
	[login_no] [smallint] NULL,
	[t_date] [smalldatetime] NULL,
	[card_no] [nvarchar](10) NULL,
	[lib_no] [smallint] NULL,
	[s_title] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[serial_articles]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[serial_articles](
	[s_code] [nvarchar](20) NULL,
	[issue_code] [nvarchar](30) NULL,
	[article_no] [smallint] NULL,
	[title] [nvarchar](250) NULL,
	[author] [nvarchar](250) NULL,
	[pub_year] [smallint] NULL,
	[keyword] [nvarchar](250) NULL,
	[abstract] [nvarchar](4000) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[return_recon]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[return_recon](
	[id.no] [nvarchar](50) NULL,
	[category] [nvarchar](50) NULL,
	[name] [varchar](50) NULL,
	[acc_no] [int] NULL,
	[title] [varchar](50) NULL,
	[author] [varchar](50) NULL,
	[issue_date] [datetime] NULL,
	[due_date] [datetime] NULL,
	[over_due_days] [int] NULL,
	[over_due_amt] [int] NULL,
	[reconcilation] [varchar](100) NULL,
	[lib_no] [int] NULL,
	[login_cancel] [varchar](50) NULL,
	[cancel_time] [datetime] NULL,
	[recon_date] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Results]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Results](
	[title ] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResourceType]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ResourceType](
	[ResourceTypeId] [tinyint] IDENTITY(1,1) NOT NULL,
	[ResourceName] [varchar](250) NOT NULL,
	[CreatedUserid] [int] NULL,
	[CreatedDateTime] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ResourceTypeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[ResourceName] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[reservation]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reservation](
	[id_no] [nvarchar](20) NULL,
	[acc_no] [nvarchar](50) NULL,
	[res_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[replace]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[replace](
	[acc_no] [int] NULL,
	[id_no] [nvarchar](20) NULL,
	[replace_date] [smalldatetime] NULL,
	[lib_no] [int] NULL,
	[nacc_no] [int] NULL,
	[amt] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reconcilation]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[reconcilation](
	[remark_id] [int] NULL,
	[reconcilation] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[r_reconcilation]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[r_reconcilation](
	[r_id] [int] NULL,
	[r_recon] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[qb_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[qb_master](
	[qbs_no] [int] NULL,
	[q_date] [smalldatetime] NULL,
	[serial_no] [nvarchar](15) NULL,
	[year_from] [smallint] NULL,
	[year_to] [smallint] NULL,
	[max_time] [nvarchar](10) NULL,
	[max_mark] [nvarchar](10) NULL,
	[dept_no] [smallint] NULL,
	[lib_no] [smallint] NULL,
	[question] [ntext] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[publisher2]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[publisher2](
	[pub_no] [smallint] NULL,
	[pub_name] [nvarchar](100) NULL,
	[full_name] [nvarchar](100) NULL,
	[place] [nvarchar](100) NULL,
	[town] [nvarchar](100) NULL,
	[state] [nvarchar](50) NULL,
	[country] [nvarchar](50) NULL,
	[pin] [nvarchar](7) NULL,
	[e_mail] [nvarchar](100) NULL,
	[phone] [nvarchar](100) NULL,
	[com_address] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[publisher]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[publisher](
	[pub_no] [smallint] NULL,
	[pub_name] [nvarchar](100) NULL,
	[full_name] [nvarchar](100) NULL,
	[place] [nvarchar](100) NULL,
	[town] [nvarchar](100) NULL,
	[state] [nvarchar](50) NULL,
	[country] [nvarchar](50) NULL,
	[pin] [nvarchar](7) NULL,
	[e_mail] [nvarchar](100) NULL,
	[phone] [nvarchar](100) NULL,
	[com_address] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[preorder_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[preorder_master](
	[lib_no] [smallint] NULL,
	[order_no] [int] NULL,
	[order_date] [smalldatetime] NULL,
	[budget_no] [smallint] NULL,
	[vendor_no] [smallint] NULL,
	[remarks] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[preorder_details]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[preorder_details](
	[lib_no] [smallint] NULL,
	[order_no] [int] NULL,
	[mat_type] [nvarchar](1) NULL,
	[dept_no] [smallint] NULL,
	[mat_title] [nvarchar](250) NULL,
	[mat_author] [nvarchar](250) NULL,
	[mat_details] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[personal]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[personal](
	[id_no] [nvarchar](50) NULL,
	[name] [nvarchar](100) NULL,
	[class] [nvarchar](30) NULL,
	[study_year] [nvarchar](10) NULL,
	[dept_no] [smallint] NULL,
	[cat_no] [smallint] NULL,
	[lock_login] [smallint] NULL,
	[remarks] [nvarchar](50) NULL,
	[password] [nvarchar](50) NULL,
	[valid_date] [smalldatetime] NULL,
	[rec_type] [nvarchar](1) NULL,
	[address] [nvarchar](250) NULL,
	[e_mail] [nvarchar](250) NULL,
	[reg_no] [nvarchar](50) NULL,
	[gender] [nvarchar](1) NULL,
	[active_member] [smallint] NULL,
	[member_type] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Period]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Period](
	[period_no] [smallint] NULL,
	[period_name] [varchar](20) NULL,
	[p_mode] [varchar](10) NULL,
	[p_count] [float] NULL,
	[short_code] [varchar](5) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[order_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_master](
	[lib_no] [smallint] NULL,
	[order_no] [int] NULL,
	[order_date] [smalldatetime] NULL,
	[budget_no] [smallint] NULL,
	[vendor_no] [smallint] NULL,
	[remarks] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_details]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_details](
	[lib_no] [smallint] NULL,
	[order_no] [int] NULL,
	[mat_type] [nvarchar](1) NULL,
	[dept_no] [smallint] NULL,
	[mat_title] [nvarchar](250) NULL,
	[mat_author] [nvarchar](250) NULL,
	[mat_details] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OPACSettings]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OPACSettings](
	[SettId] [int] IDENTITY(1,1) NOT NULL,
	[DuePageVisible] [bit] NULL,
	[DueList] [bit] NULL,
	[ODPaidUnpaid] [bit] NULL,
	[ListAllLibrary] [bit] NULL,
	[EBookDownloads] [bit] NULL,
	[WebLink] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opac_news]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opac_news](
	[sno] [int] IDENTITY(1,1) NOT NULL,
	[subject] [nvarchar](500) NULL,
	[news] [nvarchar](4000) NULL,
 CONSTRAINT [PK_opac_news] PRIMARY KEY CLUSTERED 
(
	[sno] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opac_hits]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opac_hits](
	[lib_no] [smallint] NULL,
	[hit_date] [smalldatetime] NULL,
	[no_hits] [int] NULL,
	[no_fails] [int] NULL,
	[no_success] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[opac_fail_keys]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[opac_fail_keys](
	[lib_no] [smallint] NULL,
	[mat_type] [nvarchar](1) NULL,
	[search_date] [smalldatetime] NULL,
	[hit_no] [smallint] NULL,
	[keyword] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NT]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[NT](
	[NumId] [int] IDENTITY(1,1) NOT NULL,
	[Num] [int] NULL,
	[Dates]  AS (CONVERT([datetime],[NumId],0)),
	[DateStr]  AS (CONVERT([varchar](10),CONVERT([datetime],[NumId],0),(103))),
	[DayInMonth]  AS (datepart(day,CONVERT([datetime],[NumId],0))),
	[MonthId]  AS (datepart(month,CONVERT([datetime],[NumId],0))),
	[WeekDayName]  AS (datename(weekday,datepart(day,CONVERT([datetime],[NumId],0)))),
	[DayId]  AS (datepart(weekday,datepart(day,CONVERT([datetime],[NumId],0)))),
 CONSTRAINT [pk__NT__NumId] PRIMARY KEY CLUSTERED 
(
	[NumId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[non_book]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[non_book](
	[item_code] [nvarchar](12) NULL,
	[item_no] [smallint] NULL,
	[dept_no] [smallint] NULL,
	[subject] [nvarchar](250) NULL,
	[keyword] [nvarchar](250) NULL,
	[price] [float] NULL,
	[price_name] [nvarchar](20) NULL,
	[conversion_rate] [float] NULL,
	[acc_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL,
	[avail] [smallint] NULL,
	[short_code] [nvarchar](3) NULL,
	[sl_no] [smallint] NULL,
	[author] [nvarchar](200) NULL,
	[guide] [nvarchar](100) NULL,
	[link_no] [smallint] NULL,
	[link_code] [nvarchar](20) NULL,
	[remarks] [nvarchar](250) NULL,
	[disert_id] [nvarchar](20) NULL,
	[llib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[non_bk_item]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[non_bk_item](
	[item_no] [smallint] NULL,
	[item_name] [nvarchar](100) NULL,
	[short_code] [nvarchar](3) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NewspaperUploads]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewspaperUploads](
	[UploadId] [int] IDENTITY(1,1) NOT NULL,
	[NewsPaperId] [tinyint] NULL,
	[date] [datetime] NULL,
	[FileContent] [nvarchar](4000) NULL,
	[OrgFilename] [nvarchar](50) NULL,
	[dept_no] [int] NULL,
	[GenFilename] [nvarchar](50) NULL,
	[FullFilename] [nvarchar](50) NULL,
	[Remark] [nvarchar](4000) NULL,
	[CreatedUserId] [int] NULL,
	[CreateddateTime] [datetime] NULL,
 CONSTRAINT [pk__NewspaperUploads_UploadId] PRIMARY KEY CLUSTERED 
(
	[UploadId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NewsPaper_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsPaper_master](
	[NewsPaperId] [tinyint] IDENTITY(1,1) NOT NULL,
	[NewsPaperName] [nvarchar](350) NULL,
	[Location] [nvarchar](20) NULL,
	[LanguageNo] [tinyint] NULL,
	[createdUserid] [int] NULL,
	[CreatedDateTime] [datetime] NULL,
 CONSTRAINT [pk__NewspaperMaster_UNewsPaperId] PRIMARY KEY CLUSTERED 
(
	[NewsPaperId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[news_heads]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[news_heads](
	[head_no] [int] NULL,
	[head_date] [smalldatetime] NULL,
	[head_content] [image] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[news_clip]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[news_clip](
	[nc_no] [int] NULL,
	[nc_date] [smalldatetime] NULL,
	[source] [nvarchar](30) NULL,
	[nc_title] [nvarchar](50) NULL,
	[details] [nvarchar](250) NULL,
	[remarks] [nvarchar](100) NULL,
	[location] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nb_trans]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nb_trans](
	[id_no] [nvarchar](20) NULL,
	[item_code] [nvarchar](10) NULL,
	[trans] [nvarchar](1) NULL,
	[t_date] [smalldatetime] NULL,
	[lib_no] [smallint] NULL,
	[other_date] [smalldatetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nb_circle]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nb_circle](
	[id_no] [nvarchar](20) NULL,
	[item_code] [nvarchar](10) NULL,
	[due_date] [smalldatetime] NULL,
	[due_times] [smallint] NULL,
	[login_no] [smallint] NULL,
	[t_date] [smalldatetime] NULL,
	[card_no] [nvarchar](10) NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nb_abstract]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nb_abstract](
	[item_code] [nvarchar](10) NULL,
	[nb_abstract] [nvarchar](250) NULL,
	[item_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[member_photo]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[member_photo](
	[id_no] [varchar](20) NULL,
	[photo] [image] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[mass_transfer]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mass_transfer](
	[lib_no] [smallint] NULL,
	[transfer_no] [smallint] NULL,
	[transfer_date] [smalldatetime] NULL,
	[authority_name] [nvarchar](60) NULL,
	[designation] [nvarchar](30) NULL,
	[librarian] [nvarchar](60) NULL,
	[transfer_purpose] [nvarchar](100) NULL,
	[transfer_from] [smallint] NULL,
	[transfer_to] [smallint] NULL,
	[remarks] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mass_trans_log]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mass_trans_log](
	[lib_no] [smallint] NULL,
	[transfer_no] [smallint] NULL,
	[acc_no] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Weblinks]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Weblinks](
	[Webid] [int] IDENTITY(1,1) NOT NULL,
	[Subject] [nvarchar](max) NULL,
	[Weblink] [nvarchar](max) NULL,
	[libno] [int] NULL,
	[dept_no] [int] NULL,
	[typeid] [int] NULL,
	[typename] [nvarchar](500) NULL,
 CONSTRAINT [Weblinks__Webid] PRIMARY KEY CLUSTERED 
(
	[Webid] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[web_sites]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[web_sites](
	[site_no] [int] NULL,
	[subject] [nvarchar](20) NULL,
	[details] [nvarchar](250) NULL,
	[site_id] [nvarchar](30) NULL,
	[site_path] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[weave_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[weave_master](
	[weave] [varchar](50) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[VerifyLogs]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VerifyLogs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[VerifyId] [smallint] NOT NULL,
	[acc_no] [int] NOT NULL,
	[lib_no] [tinyint] NOT NULL,
	[llib_no] [tinyint] NULL,
	[OriginalLoc] [nvarchar](50) NULL,
	[VerifiedLoc] [nvarchar](50) NULL,
	[PrevStat] [tinyint] NULL,
	[NewStat] [tinyint] NULL,
	[IsDuplicate] [bit] NULL,
	[IsRemoved] [bit] NULL,
	[CreatedDateTime] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VerifyLocation]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VerifyLocation](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[VerifyId] [smallint] NOT NULL,
	[LocName] [nvarchar](350) NOT NULL,
	[IsStarted] [bit] NULL,
	[IsCompleted] [bit] NULL,
	[CreatedDateTime] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VerifyBook]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VerifyBook](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[VerifyId] [smallint] NOT NULL,
	[llib_no] [smallint] NULL,
	[LocationId] [smallint] NULL,
	[Location] [nvarchar](20) NULL,
	[acc_no] [int] NOT NULL,
	[id_no] [nvarchar](50) NULL,
	[Stat] [tinyint] NULL,
	[CreatedDateTime] [datetime] NOT NULL,
	[VerifyDateTime] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[verify_members]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[verify_members](
	[verify_no] [int] NULL,
	[authority] [nvarchar](50) NULL,
	[desig] [nvarchar](50) NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[verify_master]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[verify_master](
	[verify_no] [int] NULL,
	[verify_date] [smalldatetime] NULL,
	[purpose] [nvarchar](100) NULL,
	[authority] [nvarchar](50) NULL,
	[desig] [nvarchar](50) NULL,
	[librarian] [nvarchar](50) NULL,
	[lib_no] [smallint] NULL,
	[verify_details] [nvarchar](250) NULL,
	[is_active] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[verify_circle]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[verify_circle](
	[verify_no] [int] NULL,
	[acc_no] [int] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[verified_stock]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[verified_stock](
	[verify_no] [int] NULL,
	[acc_no] [int] NULL,
	[lib_no] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vendor]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vendor](
	[vendor_no] [smallint] NULL,
	[vendor_name] [nvarchar](50) NULL,
	[vendor_place] [nvarchar](50) NULL,
	[vendor_town] [nvarchar](30) NULL,
	[vendor_pin] [nvarchar](7) NULL,
	[address] [nvarchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Func].[UploadFiles]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Func].[UploadFiles](
	[FileId] [int] IDENTITY(1,1) NOT NULL,
	[FuncId] [int] NOT NULL,
	[FileName] [nvarchar](2000) NOT NULL,
	[Extension] [nvarchar](2000) NULL,
	[Reason] [nvarchar](2000) NULL,
	[Status] [bit] NOT NULL,
	[CreatedUserId] [smallint] NULL,
	[CreatedDateTime] [datetime] NOT NULL,
	[DeletedUserId] [smallint] NULL,
	[DeletedDateTime] [datetime] NULL,
 CONSTRAINT [pk__UploadFiles_FileId] PRIMARY KEY CLUSTERED 
(
	[FileId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MailList]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MailList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NOT NULL,
	[FullName] [nvarchar](1000) NOT NULL,
	[Address] [nvarchar](1000) NOT NULL,
	[EmailId] [nvarchar](1000) NOT NULL,
	[PhoneNo] [nvarchar](1000) NOT NULL,
	[CreatedUserId] [int] NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [pk__MailList_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Func].[ChiefGuest]    Script Date: 03/09/2026 12:21:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Func].[ChiefGuest](
	[ChiefGuestId] [int] IDENTITY(1,1) NOT NULL,
	[FuncId] [int] NOT NULL,
	[FullName] [nvarchar](2000) NOT NULL,
	[CGProfile] [nvarchar](2000) NULL,
	[CreatedUserId] [smallint] NULL,
	[CreatedDateTime] [datetime] NOT NULL,
 CONSTRAINT [pk__ChiefGuest_FinancialYearId] PRIMARY KEY CLUSTERED 
(
	[ChiefGuestId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF__BookPDF__GenFnam__595B4002]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[BookPDF] ADD  DEFAULT (getdate()) FOR [GenFname]
GO
/****** Object:  Default [DF__BookPDF__Created__5A4F643B]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[BookPDF] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__BookPDFLi__Creat__5D2BD0E6]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[BookPDFLinks] ADD  DEFAULT (getdate()) FOR [CreateDateTime]
GO
/****** Object:  Default [DF__BooksAbst__Creat__60083D91]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[BooksAbstract] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__BooksAbst__Creat__62E4AA3C]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[BooksAbstractLinks] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__MailGroup__Creat__503BEA1C]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[MailGroup] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__MailList__Create__531856C7]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[MailList] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__NewsPaper__Creat__6A85CC04]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[NewsPaper_master] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__Newspaper__Creat__67A95F59]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[NewspaperUploads] ADD  DEFAULT (getdate()) FOR [CreateddateTime]
GO
/****** Object:  Default [DF__ResourceT__Creat__5BAD9CC8]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[ResourceType] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__VerifyBoo__Creat__30E33A54]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[VerifyBook] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__VerifyLoc__Creat__2EFAF1E2]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[VerifyLocation] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__VerifyLog__Creat__32CB82C6]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[VerifyLogs] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__BookMaste__Creat__6E565CE8]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [EBooks].[BookMaster] ADD  DEFAULT (getdate()) FOR [Createddatetime]
GO
/****** Object:  Default [DF__Books__Createdda__567ED357]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [EBooks].[Books] ADD  DEFAULT (getdate()) FOR [Createddatetime]
GO
/****** Object:  Default [DF__Departmen__Creat__7132C993]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [EBooks].[Department_Digitel] ADD  DEFAULT (getdate()) FOR [Createddatetime]
GO
/****** Object:  Default [DF__ChiefGues__Creat__3C34F16F]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [Func].[ChiefGuest] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__FunctionD__Creat__395884C4]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [Func].[FunctionDetails] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  Default [DF__UploadFil__Statu__40058253]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [Func].[UploadFiles] ADD  DEFAULT ((0)) FOR [Status]
GO
/****** Object:  Default [DF__UploadFil__Creat__40F9A68C]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [Func].[UploadFiles] ADD  DEFAULT (getdate()) FOR [CreatedDateTime]
GO
/****** Object:  ForeignKey [uk__MailList_GroupId]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [dbo].[MailList]  WITH CHECK ADD  CONSTRAINT [uk__MailList_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[MailGroup] ([Id])
GO
ALTER TABLE [dbo].[MailList] CHECK CONSTRAINT [uk__MailList_GroupId]
GO
/****** Object:  ForeignKey [fk__ChiefGuest_FuncId]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [Func].[ChiefGuest]  WITH CHECK ADD  CONSTRAINT [fk__ChiefGuest_FuncId] FOREIGN KEY([FuncId])
REFERENCES [Func].[FunctionDetails] ([FuncId])
GO
ALTER TABLE [Func].[ChiefGuest] CHECK CONSTRAINT [fk__ChiefGuest_FuncId]
GO
/****** Object:  ForeignKey [fk__UploadFiles_FuncId]    Script Date: 03/09/2026 12:21:16 ******/
ALTER TABLE [Func].[UploadFiles]  WITH CHECK ADD  CONSTRAINT [fk__UploadFiles_FuncId] FOREIGN KEY([FuncId])
REFERENCES [Func].[FunctionDetails] ([FuncId])
GO
ALTER TABLE [Func].[UploadFiles] CHECK CONSTRAINT [fk__UploadFiles_FuncId]
GO

