namespace MVCApplication.Services
{
    public interface IDatabaseManager
    {
        string GetData();
    }
    public class SqlDatabaseManager : IDatabaseManager
    {
        public string GetData()
        {
            return "Sqldb";
        }
    }
    public class MongoDbManager : IDatabaseManager
    {
        public string GetData()
        {
            return "MongoDb";
        }
    }
}
