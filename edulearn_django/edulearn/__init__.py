# This allows Django to use pymysql if mysqlclient C-bindings are not installed
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ImportError:
    pass
