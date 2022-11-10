using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Abstract
{
    public interface ISoftDelete
    {
        bool IsDeleted { get; set; }
    }
}
