using EBonik.Data.Entities.HistoryArea;
using IqraCommerce.Entities.BatchArea;
using IqraCommerce.Entities.CourseArea;
using IqraCommerce.Entities.CourseSubjectTeacherArea;
using IqraCommerce.Entities.SubjectArea;
using IqraCommerce.Entities.TeacherArea;
using IqraCommerce.Entities.TeacherSubjectArea;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace IqraCommerce.Entities
{
    public class AppDB : DbContext
    {
        private static DbContextOptions<AppDB> options { get; set; }
        public static DbContextOptions<AppDB> Options
        {
            get
            {
                if (options == null)
                {
                    options = new DbContextOptionsBuilder<AppDB>()
                 .UseSqlServer(new SqlConnection(Startup.ConnectionString))
                 .Options;
                }
                return options;
            }
        }
        public AppDB(DbContextOptions<AppDB> options) : base(options) { 
        
        }

        public AppDB():base(Options)
        {

        }

        #region DeviceArea
        //public virtual DbSet<Device> Device { get; set; } // Used
        //public virtual DbSet<Activity> Activity { get; set; } // Used
        #endregion DeviceArea

        #region HistoryArea
        public virtual DbSet<ChangeHistory> ChangeHistory { get; set; }
        #endregion

        #region TeacherArea
        public virtual DbSet<Teacher> Teacher { get; set; }
        #endregion

        #region Subject
        public virtual DbSet<Subject> Subject { get; set; }
        #endregion

        #region TeacherSubject
        public virtual DbSet<TeacherSubject> TeacherSubject { get; set; }
        #endregion

        #region Course
        public virtual DbSet<Course> Course { get; set; }
        #endregion

        #region CourseSubjectTeacher
        public virtual DbSet<CourseSubjectTeacher> CourseSubjectTeacher { get; set; }
        #endregion

        #region Batch
        public virtual DbSet<Batch> Batch { get; set; }
        #endregion



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
