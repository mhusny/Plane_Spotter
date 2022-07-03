using PlaneSpotterAPI.CustomAttributes;
using System.ComponentModel.DataAnnotations;

namespace PlaneSpotterAPI.Model
{
    public class PlaneSpotter
    {
        public Guid? Id { get; set; }

        [MaxLength(128)]
        public string Planemake { get; set; } = string.Empty;

        [MaxLength(128)]
        public string Planemodel { get; set; } = String.Empty;

        [PlaneRgistration("99-99999", ErrorMessage = "{0} value does not match the mask {1}.")]
        public string Planeregistration { get; set; } = String.Empty;

        [MaxLength(255)]
        public string Location { get; set; } = String.Empty;

        [MaximumDate]
        public DateTime DateTime { get; set; } = DateTime.MinValue;
        public string Photo { get; set; } = String.Empty.ToString();
    }
}
