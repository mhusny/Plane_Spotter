
using System.ComponentModel.DataAnnotations;

namespace PlaneSpotterAPI.CustomAttributes
{
    public class MaximumDateAttribute : ValidationAttribute
    {
        public MaximumDateAttribute()
        {

        }

        public override bool IsValid(object value)
        {
            var maxdate = (DateTime)value;
            bool result = true;

            if (maxdate > DateTime.Now)
            {
                result = false;
            }
            return result;
        }
    }
}
