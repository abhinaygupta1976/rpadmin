export const menuItemsData = [
  {
    title: "Home",
    route: "/admin/dashboard",
  },
  {
    title: "Directory",
    submenu: [
      {
        title: "Country",
        route: "/admin/directory/country",
      },
      {
        title: "State",
        route: "/admin/directory/state",
      },
      {
        title: "City",
        route: "/admin/directory/city",
      },
      {
        title: "Locality",
        route: "/admin/directory/locality",
      },
    ],
  },
  {
    title: "Services",
    submenu: [
      {
        title: "Project",
        route: "/admin/services/project",
      },
    ],
  },
  {
    title: "Master Data",
    submenu: [
      {
        title: "Project Category",
        submenu: [
          {
            title: "Project Categories",
            route: "/admin/projectcategory",
          },
          {
            title: "Add Project Category",
            route: "/admin/addprojectcategory",
          },
        ],
      },
      {
        title: "Amenity",
        submenu: [
          {
            title: "Amenities",
            route: "/admin/amenities",
          },
          {
            title: "Add Amenities",
            route: "/admin/addamenities",
          },
        ],
      },
    ],
  },
];
