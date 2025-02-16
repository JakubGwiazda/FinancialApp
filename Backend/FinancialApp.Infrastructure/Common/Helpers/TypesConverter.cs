using FinancialApp.Domain;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Infrastructure.Common.Helpers
{
    internal static class TypesConverter
    {
        public static T ConvertToType<T>(string value, SettingValueType type)
        {
            Type targetType = typeof(T);

            if (targetType == typeof(string))
            {
                return (T)(object)value;
            }
            if (targetType == typeof(int))
            {
                if (int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out int intValue))
                {
                    return (T)(object)intValue;
                }
                throw new FormatException($"Invalid integer format: {value}");
            }
            if (targetType == typeof(bool))
            {
                if (bool.TryParse(value, out bool boolValue))
                {
                    return (T)(object)boolValue;
                }
                if (value == "1") return (T)(object)true;
                if (value == "0") return (T)(object)false;
                throw new FormatException($"Invalid boolean format: {value}");
            }
            if (targetType == typeof(DateTime))
            {
                if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out DateTime dateValue))
                {
                    return (T)(object)dateValue;
                }
                throw new FormatException($"Invalid date format: {value}");
            }

            throw new ArgumentException($"Unsupported type: {targetType}");
        }
    }
}
