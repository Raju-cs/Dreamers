using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;

namespace IqraCommerce.Helpers
{
    public class ImageManager
    {
        private enum size { Original, Small, Icon };
        private string rootDirectory = "Directories";
        private readonly IConfiguration _config;

        public ImageManager(IConfiguration config)
        {
            _config = config;
        }

        public string Store(IFormFile image, string directory)
        {
            var splitedName = image.FileName.Split('.');
            var imageName = Guid.NewGuid().ToString() + "." + splitedName[splitedName.Length - 1];

            Save(image, imageName, directory, size.Original);
            Save(image, imageName, directory, size.Small, 480);
            Save(image, imageName, directory, size.Icon, 80);

            return imageName;
        }

        public IList<string> Store(IList<IFormFile> images, string directory)
        {
            IList<string> filenames = new List<string>();

            foreach (var image in images)
            {
                filenames.Add(Store(image, directory));
            }

            return filenames;
        }

        public object GetImageUrls(string imageName, string path)
        {
            return new
            {
                Origianl = ImageUrl(imageName, path, "Original"),
                Small = ImageUrl(imageName, path, "Small"),
                Icon = ImageUrl(imageName, path, "Icon")
            };
        }

        public string ImageUrl(string imageName, string path, string size)
        {
            var url = _config.GetSection(path)[size];

            return "/" + url + imageName;
        }

        private void Save(IFormFile image, string imageName, string dirName, size imageSize, int resulation = 0)
        {
            var rootPath = _config.GetSection(rootDirectory)["ROOT_PATH"];
            var dir = $"wwwroot/images/{dirName}/{imageSize.ToString()}/";

            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);


            using (var memoryStream = new MemoryStream())
            {
                image.CopyTo(memoryStream);

                var fileBytes = memoryStream.ToArray();

                var imageStream = Image.FromStream(memoryStream);

                var transformedImage = imageStream;

                if ((imageStream.Width > resulation || imageStream.Height > resulation) && resulation != 0)
                {
                    var ratioX = (double)resulation / imageStream.Width;
                    var ratioY = (double)resulation / imageStream.Height;

                    var ratio = Math.Min(ratioX, ratioY);

                    var newWidth = (int)(imageStream.Width * ratio);
                    var newHeight = (int)(imageStream.Height * ratio);

                    transformedImage = new Bitmap(newWidth, newHeight);

                    using (var graphics = Graphics.FromImage(transformedImage))
                    {
                        graphics.DrawImage(imageStream, 0, 0, newWidth, newHeight);
                    }
                }

                transformedImage.Save(dir + imageName);
            }
           
        }
    }
}
