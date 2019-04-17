import { NbMenuItem } from '@nebular/theme';

export const ALL_MENU_ITEMS: NbMenuItem[] = [
  {
    "title": "Dashboard",
    "link": "/pages/fulldash"
  },
  {
    "title": "Consumer",
    link: "/pages/consumer/manage/consumer"
  },
  {
    "title": "Customer",
    link: "/pages/consumer/manage/customer"
  },
  {
    "title": "Provider",
    link: "/pages/consumer/manage/provider"
  },
  {
    "title": "Device",
    children: [
      {
        "title": "Manage",
        link: "/pages/consumer/manage/device"
      },
      {
        "title": "Inventory",
        link: "/pages/device/inventory"
      }
    ]
  },
  {
    "title": "Service",
    children: [
      {
        "title": "Manage",
        link: "/pages/consumer/manage/service"
      },
      {
        "title": "Inventory",
        link: "/pages/service/inventory"
      }
    ]
  },
  {
    "title": "Package",
    link: "/pages/consumer/manage/package"
  },
  {
    "title": "Kit",
    link: "/pages/kit/manage/kit"
  },
  {
    "title": "Order",
    link: "/pages/consumer/manage/transaction"
  },
  {
    "title": "Help Desk",
    children: [
      {
        "title": "SOS",
        link: "/pages/helpdesk/sos/manage"
      },
      {
        "title": "Safe Me",
        link: "/pages/helpdesk/safeme/manage"
      },
      {
        "title": "Help Me",
        link: "/pages/helpdesk/helpme/manage"
      },
      {
        "title": "Book A Cab",
        link: "/pages/helpdesk/bookacab/manage"
      },
      {
        "title": "Doctor Appointment",
        link: "/pages/helpdesk/doctorappointment/manage"
      },
      {
        "title": "Diagnostic Appointment",
        link: "/pages/helpdesk/diagnosticappointment/manage"
      }
    ]
  },
  {
    "title": "Health Vault",
    children: [
      {
        "title": "ECG",
        link: "/pages/healthvault/report/ecg"
      },
      {
        "title": "Sleep",
        link: "/pages/healthvault/report/sleep"
      },
      {
        "title": "Stress",
        link: "/pages/healthvault/report/stress"
      },
      {
        "title": "Step",
        link: "/pages/healthvault/report/step"
      },
      {
        "title": "Calorie",
        link: "/pages/healthvault/report/calorie"
      }
    ]
  }
];


/*

export const DEFAULT_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-grid-a',
    link: '/pages/fulldash',
  },
  {
    title: 'Consumer',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/consumer/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/consumer/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/consumer/report',
      //},
    ],
  },
  {
    title: 'Customer',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/customer/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/customer/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/customer/report',
      //},
    ],
  },
  {
    title: 'Provider',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //  icon: 'nb-grid-a',
      //  link: '/pages/provider/dashboard',
      //},
      {
        title: 'Manage',
        icon: 'nb-list',
        link: '/pages/provider/manage',
      },
      //{
      //  title: 'Report',
      //  icon: 'nb-compose',
      //  link: '/pages/provider/report',
      //},
    ],
  },
  {
    title: 'Device',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/device/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/device/manage',
      },
      {
        title: 'Inventory',
      icon: 'nb-bar-chart',
        link: '/pages/device/inventory',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/device/report',
      //},
    ],
  },
  {
    title: 'Service',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/service/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/service/manage',
      },
      //{
      //  title: 'Inventory',
      //icon: 'nb-bar-chart',
      //  link: '/pages/service/inventory',
      //},
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/service/report',
      //},
    ],
  },
  {
    title: 'Package',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/package/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/package/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/package/report',
      //},
    ],
  },
  {
    title: 'Kit',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/kit/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/kit/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/kit/report',
      //},
    ],
  },
  {
    title: 'Order',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/order/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/order/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/order/report',
      //},
    ],
  },
  {
    title: 'Health Vault',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/healthvault/dashboard',
      //},
      {
        title: 'Report',
      icon: 'nb-compose',
        children: [
     {
        title: 'Sleep',
        icon: 'nb-power',
        link: '/pages/healthvault/report/sleep',
     },
     {
        title: 'Stress',
        icon: 'nb-drop',
        link: '/pages/healthvault/report/stress',
     },
     {
        title: 'Step',
        icon: 'nb-roller-shades',
        link: '/pages/healthvault/report/step',
     },
     {
        title: 'Calorie',
        icon: 'ion-ionic',
        link: '/pages/healthvault/report/calorie',
     },
     {
        title: 'ECG',
        icon: 'ion-bug',
        link: '/pages/healthvault/report/ecg',
     },
  ],
      },
    ],
  },
  {
    title: 'Help Desk',
    icon: 'nb-star',
    children: [
      //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/dashboard',
      //},
      {
        title: 'SOS',
      icon: 'nb-flame-circled',
        children: [
      //{
      //  title: 'Dashboard',
      //  icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/sos/dashboard',
      //},
     {
        title: 'Manage',
        icon: 'nb-list',
        link: '/pages/helpdesk/sos/manage',
     },
      //{
      //  title: 'Report',
      //  icon: 'nb-compose',
      //  link: '/pages/helpdesk/sos/report',
      //},
     ],
      },
      {
        title: 'Safe Me',
      icon: 'ion-help-buoy',
        children: [
     //{
      //  title: 'Dashboard',
      //  icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/safeme/dashboard',
     //},
     {
        title: 'Manage',
        icon: 'nb-list',
        link: '/pages/helpdesk/safeme/manage',
     },
     //{
      //  title: 'Report',
      //  icon: 'nb-compose',
      //  link: '/pages/helpdesk/safeme/report',
     //},
  ],
      },
      {
        title: 'Help Me',
      icon: 'nb-help',
        children: [
     //{
      //  title: 'Dashboard',
      //  icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/helpme/dashboard',
     //},
     {
        title: 'Manage',
        icon: 'nb-list',
        link: '/pages/helpdesk/helpme/manage',
     },
     //{
      //  title: 'Report',
      //  icon: 'nb-compose',
      //  link: '/pages/helpdesk/helpme/report',
     //},
  ],
      },
      {
        title: 'Book a Cab',
      icon: 'nb-location',
        children: [
     //{
      //  title: 'Dashboard',
      //  icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/bookacab/dashboard',
     //},
     {
        title: 'Manage',
        icon: 'nb-list',
        link: '/pages/helpdesk/bookacab/manage',
     },
     //{
      //  title: 'Report',
      //  icon: 'nb-compose',
      //  link: '/pages/helpdesk/bookacab/report',
     //},
  ],
      },
      {
        title: 'Doctor Appointment',
      icon: 'ion-clipboard',
        children: [
     //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/doctorappointment/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/helpdesk/doctorappointment/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/helpdesk/doctorappointment/report',
      //},
  ],
      },
      {
        title: 'Diagnostic Appointment',
      icon: 'ion-heart-broken',
        children: [
     //{
      //  title: 'Dashboard',
      //icon: 'nb-grid-a',
      //  link: '/pages/helpdesk/diagnosticappointment/dashboard',
      //},
      {
        title: 'Manage',
      icon: 'nb-list',
        link: '/pages/helpdesk/diagnosticappointment/manage',
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/helpdesk/diagnosticappointment/report',
      //},
  ],
      },
      //{
      //  title: 'Report',
      //icon: 'nb-compose',
      //  link: '/pages/helpdesk/report',
      //},
    ],
  },
  {
    title: 'Theme Default',
    group: true,
  },
  {
    title: 'E-commerce',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'nb-home',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Custom',
    group: true,
  },
  {
    title: 'Test',
    icon: 'nb-home',
    children: [
      {
        title: 'First - Test',
        link: '/pages/test/first-test',
      },
      {
        title: 'Second - Test',
        link: '/pages/test/second-test',
      },
      {
        title: 'Third - Test',
        link: '/pages/test/third-test',
      },
      {
        title: 'Fourth - Test',
        link: '/pages/test/fourth-test',
      },
      {
        title: 'Fifth - Test',
        link: '/pages/test/fifth-test',
      },
      {
        title: 'Sixth - Test',
        link: '/pages/test/sixth-test',
      },
    ],
  },
  {
    title: 'UMAC',
    icon: 'nb-home',
    children: [
      {
        title: 'Login',
        link: '/pages/umac/login',
      },
      {
        title: 'Forgot Password',
        link: '/pages/umac/forgot-password',
      },
      {
        title: 'Reset Password',
        link: '/pages/umac/reset-password',
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Extra Components',
    icon: 'nb-star',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Stepper',
        link: '/pages/extra-components/stepper',
      },
      {
        title: 'List',
        link: '/pages/extra-components/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/extra-components/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/extra-components/accordion',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Tree',
        link: '/pages/extra-components/tree',
      },
      {
        title: 'Tabs',
        link: '/pages/extra-components/tabs',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Bootstrap',
    icon: 'nb-gear',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/bootstrap/inputs',
      },
      {
        title: 'Buttons',
        link: '/pages/bootstrap/buttons',
      },
      {
        title: 'Modal',
        link: '/pages/bootstrap/modal',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];


*/