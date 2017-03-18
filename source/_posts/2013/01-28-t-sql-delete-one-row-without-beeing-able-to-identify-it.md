---
title: 'T-SQL: delete one row without beeing able to identify it'
tags:
  - coding
  - Kwik-e
  - SQL Server
date: 2013-01-28T20:18:35.000Z
author: Fabian Wetzel
---

It happened in a development database some time ago: I had more than one row with exactly the same values in any column including the ID column. I noticed the ID column (int) had no identity specification and changing that failed because of the duplicates.

The solution was to use the Top(n) syntax. You cannot only do

```sql
select top(1) * from mytable where id=59
```

but also

```sql
delete top(1) from mytable where id=59
```

That worked suprisingly well and I could setup the identity column after this ![Smiley](wlEmoticon-smile.png)


