---
title: Doing Transactions In Oracle Like You Know Them From SQL Server
id: 2064
comment: false
tags:
  - Oracle
  - SQL Server
date: 2014-03-31T15:13:37.000Z
author: Fabian Wetzel
---

I know how to do transactions in SQL Server. It is really easy, at least for me. In ORACLE, the keywords are slightly different and you have to use semicolons at the end of each statement. You also have to name your transaction but an empty string will do just fine.

Compare this for yourself:

```sql
--Oracle
set transaction name 'mytransaction';
update mytable set somecolumn = 'some value' where id = 22;
commit;
```

```sql
--SQL Server
begin tran
update mytable set somecolumn = 'some value' where id = 22
commit
```

