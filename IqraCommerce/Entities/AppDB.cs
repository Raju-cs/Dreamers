﻿using EBonik.Data.Entities.HistoryArea;
using IqraCommerce.Entities.CourseArea;
using IqraCommerce.Entities.CourseSubjectTeacherArea;
using IqraCommerce.Entities.StudentArea;
using IqraCommerce.Entities.SubjectArea;
using IqraCommerce.Entities.TeacherArea;
using IqraCommerce.Entities.TeacherSubjectArea;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using IqraCommerce.Entities.StudentCourseArea;
using IqraCommerce.Entities.RoutineArea;
using IqraCommerce.Entities.ModuleArea;
using IqraCommerce.Entities.StudentModuleArea;
using IqraCommerce.Entities.BatchArea;
using IqraCommerce.Entities.PeriodArea;
using IqraCommerce.Entities.FeesArea;
using IqraCommerce.Entities.ModulePeriodArea;
using IqraCommerce.Entities.CoachingAccountArea;
using IqraCommerce.Entities.CoursePeriodArea;
using IqraCommerce.Entities.TeacherFeeArea;

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

        #region Module
        public virtual DbSet<Module> Module { get; set; }
        #endregion

        #region Student
        public virtual DbSet<Student> Student { get; set; }
        #endregion

        #region Batch
        public virtual DbSet<Batch> Batch { get; set; }
        #endregion

        #region StudentModule
        public virtual DbSet<StudentModule> StudentModule { get; set; }
        #endregion

        #region StudentCourse
        public virtual DbSet<StudentCourse> StudentCourse { get; set; }
        #endregion

        #region Routine
        public virtual DbSet<Routine> Routine { get; set; }
        #endregion

        #region Period
        public virtual DbSet<Period> Period { get; set; }
        #endregion

        #region Fees
        public virtual DbSet<Fees> Fees { get; set; }
        #endregion

        #region ModulePeriod
        public virtual DbSet<ModulePeriod> ModulePeriod { get; set; }
        #endregion

        #region CoachingAccount
        public virtual DbSet<CoachingAccount> CoachingAccount { get; set; }
        #endregion

        #region CoursePeriod
        public virtual DbSet<CoursePeriod> CoursePeriod { get; set; }
        #endregion

        #region TeacherFee
        public virtual DbSet<TeacherFee> TeacherFee { get; set; }
        #endregion
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
