/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "0.0.0.0", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "192.168.0.0/16"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"]
	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "WallberryTheme",
			position: "fullscreen_below", // Required Position
			config: {
				unsplashAccessKey: "UNSPLASH_ACCESS_KEY",
				collections: "1319040,I3fsfiCb6Ek",
				brightImageOpacity: 0.5,
				addBackgroundFade: ["bottom"],
				fontSize: "40px"
			}
		},
		{
			module: "WallberryTheme/WB-clock",
			position: "top_bar", // highly suggest using top_bar position
			config: {}
  		},
		{
			module: "WallberryTheme/WB-weather",
			position: "bottom_bar",  // Highly suggested location
			config: {
				// See "Configuration options" for more information.
				apiKey: "WEATHER_API_KEY",
				latitude:   32.9246,
				longitude: -80.7434
			}
  		},
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
    			module: 'MMM-CalendarExt2',
			disabled: false,
    			config: {
        			rotateInterval: 60*1000,
        			deduplicateEventsOn: [
          				"startDate", "endDate", "title",
        			],
        			scenes:[
            				{
                				name: "DEFAULT",
                				views: ["week-vertical"],
            				},
        			],
        			views:[
            				{
                				name: "week-vertical",
                				title: "Family Calendar",
                				mode: "daily",
                				position: "top_left",
                				slotCount: 6,
                				locale: "en",
                				hideOverflow: false,
                				filterPassedEvent: true,
						timeFormat: "h:mm a",
						dateTimeFormat: {
							sameDay: "[Today] h:mm a",
  							nextDay: "[Tomorrow] h:mm a",
  							nextWeek: "dddd h:mm a",
  							lastDay: "[Yesterday] h:mm a",
  							lastWeek: "[Last] ddd h:mm a",
  							sameElse: "MM/DD h:mm a"
						},
						slotMaxHeight: "160px",
                				calendars: [
                  					"Family", "Holidays", "Birthdays"
                				],
            				},
        			],
        			calendars: [
					{
                        			name: "Family",
                                		url: "FAMILY_CALENDAR_URL",
						scanInterval: 1000*60*5
                        		},
                                        {
                                                name: "Birthdays",
                                                symbol: "birthday-cake",
                                                url: "http://0.0.0.0:8080/modules/birthdays/birthdays.ics",
                                        },
                                        {
                                                name: "Holidays",
                                                url: "https://p24-calendars.icloud.com/holiday/US_en.ics"
                                        }
			        ],
    			},
		},
		{
			module: 'MMM-Todoist',
			disabled: false,
			position: 'bottom_left',	// This can be any of the regions. Best results in left or right regions.
			header: 'Todos',
			config: {
				hideWhenEmpty: false,
				accessToken: 'TODOIST_API_KEY',
				maximumEntries: 60,
				updateInterval: 5*60*1000,
				wrapEvents: true,
				fade: false,
				showProject: false,
				projects: [ 2306512981 ]
      			}
		},
		{
			module: "newsfeed",
			disabled: false,
			position: "bottom_right",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
					{
          					title: "BBC",
          					url: "http://feeds.bbci.co.uk/news/world/rss.xml",
        				},
					{
						title: "WCNC",
						url: "https://feeds.feedblitz.com/wcnc/home",
					}
				],
				wrapTitle: true,
				showDescription: true,
				wrapDescription: true,
				showSourceTitle: true,
				truncDescription: true,
				lengthDescription: 300,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
				ignoreOlderThan: 86400000,
				ignoreOldItems: true,
				updateInterval: 15000
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
