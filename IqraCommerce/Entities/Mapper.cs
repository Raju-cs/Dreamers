using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace IqraCommerce.Entities
{

    public static class Mapper
    {
        public static T CopyProperties<T>(this object source, T destination)
        {
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");
            Type typeDest = destination.GetType();
            Type typeSrc = source.GetType();
            PropertyInfo[] srcProps = typeSrc.GetProperties();
            foreach (PropertyInfo srcProp in srcProps)
            {
                if (!srcProp.CanRead)
                {
                    continue;
                }
                PropertyInfo targetProperty = typeDest.GetProperty(srcProp.Name);
                if (targetProperty == null)
                {
                    continue;
                }
                if (!targetProperty.CanWrite)
                {
                    continue;
                }
                if (targetProperty.GetSetMethod(true) != null && targetProperty.GetSetMethod(true).IsPrivate)
                {
                    continue;
                }
                if ((targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) != 0)
                {
                    continue;
                }
                if (!targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType))
                {
                    continue;
                }
                // Passed all tests, lets set the value
                targetProperty.SetValue(destination, srcProp.GetValue(source, null), null);
            }
            return destination;
        }
        public static List<T> CopyProperties<T, T2>(this List<T2> source)
        {
            if (source == null)
                throw new Exception("Source or/and Destination Objects are null");
            Type typeDest = typeof(T);
            Type typeSrc = typeof(T2);
            PropertyInfo[] srcProps = typeSrc.GetProperties();
            List<PropertyModel> properties = new List<PropertyModel>();
            foreach (PropertyInfo srcProp in srcProps)
            {
                if (!srcProp.CanRead)
                {
                    continue;
                }
                PropertyInfo targetProperty = typeDest.GetProperty(srcProp.Name);
                if (targetProperty == null)
                {
                    continue;
                }
                if (!targetProperty.CanWrite)
                {
                    continue;
                }
                if (targetProperty.GetSetMethod(true) != null && targetProperty.GetSetMethod(true).IsPrivate)
                {
                    continue;
                }
                if ((targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) != 0)
                {
                    continue;
                }
                if (!targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType))
                {
                    continue;
                }
                properties.Add(new PropertyModel() { target = targetProperty, source = srcProp });
            }
            List<T> list = new List<T>();
            foreach (var item in source)
            {
                T target = (T)Activator.CreateInstance(typeof(T));
                foreach (var property in properties)
                {
                    property.target.SetValue(target, property.source.GetValue(item, null), null);
                }
                list.Add(target);
            }
            return list;
        }
        public static List<T> CopyProperties<T, T2>(this List<T2> source, List<T> destination)
        {
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");
            Type typeDest = typeof(T);
            Type typeSrc = typeof(T2);
            PropertyInfo[] srcProps = typeSrc.GetProperties();
            List<PropertyModel> properties = new List<PropertyModel>();
            foreach (PropertyInfo srcProp in srcProps)
            {
                if (!srcProp.CanRead)
                {
                    continue;
                }
                PropertyInfo targetProperty = typeDest.GetProperty(srcProp.Name);
                if (targetProperty == null)
                {
                    continue;
                }
                if (!targetProperty.CanWrite)
                {
                    continue;
                }
                if (targetProperty.GetSetMethod(true) != null && targetProperty.GetSetMethod(true).IsPrivate)
                {
                    continue;
                }
                if ((targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) != 0)
                {
                    continue;
                }
                if (!targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType))
                {
                    continue;
                }
                properties.Add(new PropertyModel() { target = targetProperty, source = srcProp });
            }
            foreach (var item in source)
            {
                T target = (T)Activator.CreateInstance(typeof(T));
                foreach (var property in properties)
                {
                    property.target.SetValue(target, property.source.GetValue(item, null), null);
                }
                destination.Add(target);
            }
            return destination;
        }
        public static List<T> CopyProperties<T, T2>(this List<T2> source, List<T> destination, Func<T2, T> calBack)
        {
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");
            Type typeDest = typeof(T);
            Type typeSrc = typeof(T2);
            PropertyInfo[] srcProps = typeSrc.GetProperties();
            List<PropertyModel> properties = new List<PropertyModel>();
            foreach (PropertyInfo srcProp in srcProps)
            {
                if (!srcProp.CanRead)
                {
                    continue;
                }
                PropertyInfo targetProperty = typeDest.GetProperty(srcProp.Name);
                if (targetProperty == null)
                {
                    continue;
                }
                if (!targetProperty.CanWrite)
                {
                    continue;
                }
                if (targetProperty.GetSetMethod(true) != null && targetProperty.GetSetMethod(true).IsPrivate)
                {
                    continue;
                }
                if ((targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) != 0)
                {
                    continue;
                }
                if (!targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType))
                {
                    continue;
                }
                properties.Add(new PropertyModel() { target = targetProperty, source = srcProp });
            }
            foreach (var item in source)
            {
                T target = calBack(item);
                foreach (var property in properties)
                {
                    property.target.SetValue(target, property.source.GetValue(item, null), null);
                }
                destination.Add(target);
            }
            return destination;
        }
        public static QueryColumnModel GetQueryColumnModel(Type type)
        {
            var query = new QueryColumnModel() { Columns = new List<string>() };
            foreach (PropertyInfo srcProp in type.GetProperties())
            {
                if (srcProp.CanRead && srcProp.CanWrite && (srcProp.PropertyType == typeof(double) || srcProp.PropertyType == typeof(int) || srcProp.PropertyType == typeof(Int64) || srcProp.PropertyType == typeof(long)))
                {
                    query.Columns.Add(srcProp.Name);
                }
                else if (query.DateField != "CreatedAt" && srcProp.CanRead && srcProp.CanWrite && (srcProp.PropertyType == typeof(DateTime)))
                {
                    query.DateField = "CreatedAt";
                }
            }
            object[] attributes = type.GetCustomAttributes(true);

            foreach (object attribute in attributes)
            {
                AliasAttribute aliasAttribute = attribute as AliasAttribute;

                if (aliasAttribute != null)
                    query.Alias = aliasAttribute.Value;
                TableAttribute tableAttribute = attribute as TableAttribute;

                if (tableAttribute != null)
                    query.Table = "[dbo].[" + tableAttribute.Name + "] ";
            }
            if (query.Table == null)
            {
                query.Table = "[dbo].[" + type.Name + "] ";
            }

            return query;
        }
        public class QueryColumnModel
        {
            public string Table { get; set; }
            public string Alias { get; set; }
            public List<string> Columns { get; set; }
            public string DateField { get; set; }
            /// <summary>
            /// 
            /// </summary>
            public string IsDeletedCondition { get; set; }
        }
        public class PropertyModel
        {
            public PropertyInfo source { get; set; }
            public PropertyInfo target { get; set; }
        }

    }
}
