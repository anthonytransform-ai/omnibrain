## 📋 Active Plans & Tasks

```dataview
TABLE status, updated
FROM "Project/Plans"
WHERE file.name != "README" AND status != "completed" AND status != "archived"
SORT file.mtime DESC
```

## 📅 Recent Daily Notes

```dataview
LIST
FROM "Project/Daily_Logs"
WHERE file.name != "README"
SORT file.name DESC
LIMIT 5
```

## 🔍 System Directory

```dataview
TABLE file.folder as Folder
FROM "Project/System" OR "Project/Features"
SORT file.name ASC
```
