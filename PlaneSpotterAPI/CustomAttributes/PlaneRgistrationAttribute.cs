
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace PlaneSpotterAPI.CustomAttributes
{
    public class PlaneRgistrationAttribute : ValidationAttribute
    {
        // Internal field to hold the mask value.
        readonly string _mask;

        public string Mask
        {
            get { return _mask; }
        }

        public PlaneRgistrationAttribute(string mask)
        {
            _mask = mask;
        }


        public override bool IsValid(object value)
        {
            var PlaneRegistratioNumber = (String)value;
            bool result = true;
            if (this.Mask != null)
            {
                result = MatchesMask(this.Mask, PlaneRegistratioNumber);
            }
            return result;
        }

        // Checks if the entered phone number matches the mask.
        internal bool MatchesMask(string mask, string planeRegistrationNumber)
        {
            if (mask.Length < planeRegistrationNumber.Trim().Length)
            {
                // Length mismatch.
                return false;
            }
            for (int i = 0; i < mask.Length; i++)
            {
                if (mask[i] == '-' && planeRegistrationNumber[i] != '-' )
                {
                    // Spacing character expected at this position.
                    return false;
                }
            }
            return true;
        }

        public override string FormatErrorMessage(string name)
        {
            return String.Format(CultureInfo.CurrentCulture,
              ErrorMessageString, name, this.Mask);
        }
    }
}
