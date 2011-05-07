/*globals app */

/** v-- Insert into script.js? --v **/
// This is the list of core team members info (ordered by first name)
var VISIBLE_MEMBERS = [
  {
    src: 'img/avatars/charles-jolley-large.png',
    name: "Charles Jolley",
    location: "Los Altos, CA, USA",
    shortBio: "Charles Jolley is Founder and CEO of Strobe, a software and cloud services company focused on the mobile web. He is also the creator of the SproutCore open source framework. Before founding Strobe, Charles was ",
    fullBio: "Charles Jolley is Founder and CEO of Strobe, a software and cloud services company focused on the mobile web. He is also the creator of the SproutCore open source framework. Before founding Strobe, Charles was responsible for Mobile Me application development at Apple."
  },
  {
    src: 'img/avatars/colin-campbell-large.png',
    name: "Colin Campbell",
    location: "St. John’s, Newfoundland, Canada",
    shortBio: "Colin has a background in web development, and works for Strobe writing mobile applications. He has mostly worked on media and publishing apps for iPhone, Android, iPad and desktop. Before joining Strobe in July ’10, he worked in advertising ",
    fullBio: "Colin has a background in web development, and works for Strobe writing mobile applications. He has mostly worked on media and publishing apps for iPhone, Android, iPad and desktop. Before joining Strobe in July ’10, he worked in advertising, using mostly Flash and jQuery. He believes wholeheartedly that SproutCore is the best way to make kickass apps."
  },
  {
    src: 'img/avatars/evin-grano-large.png',
    name: "Evin Grano",
    location: "Culpepper, VA, USA",
    shortBio: "Evin has been working with Sproutcore ever since he took his job at Eloqua in 2008. Working closely with a large team of developers, Evin was the Technical and Team Lead for developing one of the largest Sproutcore Application at Eloqua. ",
    fullBio: "Evin has been working with Sproutcore ever since he took his job at Eloqua in 2008. Working closely with a large team of developers, Evin was the Technical and Team Lead for developing one of the largest Sproutcore Application at Eloqua. Evin joined the SproutCore Core Team about 2 years ago because of his contributions to the core framework (Statecharts, Nested Records) and his work on the widely used 3rd party frameworks for SproutCore: SproutCore-UI (SCUI), SproutCore Universal DataSource (SCUDS), and Sai, a vector graphics library for SproutCore. He has been a contributor to Greenhouse, SpoutCore’s UI builder, with fellow core member Mike Ball. Evin has done talks about SproutCore for local meetups and JSConf 2009 and sometime posts to his blog about SproutCore."
  },
  {
    src: 'img/avatars/michael-cohen-large.png',
    name: "Michael Cohen",
    location: "San Francisco, CA, USA",
    shortBio: "Starting with Eloqua to help build the company’s new Eloqua10 user interface that is entirely based on SproutCore, Michael has been involved with the framework for two years. As a core team member, he is the creator of two SproutCore frame ",
    fullBio: "Starting with Eloqua to help build the company’s new Eloqua10 user interface that is entirely based on SproutCore, Michael has been involved with the framework for two years. As a core team member, he is the creator of two SproutCore frameworks: Ki, a full featured statechart framework that is now part of latest SproutCore release, version 1.5; and Lebowski, a test integration framework for SproutCore applications. Michael also maintains a blog focused on helping people learn about SproutCore."
  },
  {
    src: 'img/avatars/mike-ball-large.png',
    name: "Mike Ball",
    location: "Fairfax, VA, USA",
    shortBio: "Mike has been involved with SproutCore for nearly 3 years. During that period he used SproutCore to transform Eloqua's UX. As a core team member Mike has been primarily involved developing SpoutCore's UI builder Greenhouse and its associated ",
    fullBio: "Mike has been involved with SproutCore for nearly three years. During that period he used SproutCore to transform Eloqua’s UX. As a core team member Mike has been primarily involved developing SpoutCore’s UI builder Greenhouse and its associated frameworks and infrastructure. Mike has also contributes to the SproutCore-UI and SproutCore Universal Datastore frameworks, and on rare occasions posts to his blog about SproutCore design patterns."
  },
  {
    src: 'img/avatars/peter-wagenet-large.png',
    name: "Peter Wagenet",
    location: "Orange County, CA, USA",
    shortBio: "Peter Wagenet is a member of the SproutCore Core Team and a SproutCore engineer at Strobe. Prior to working at Strobe, Peter was also a Ruby on Rails engineer and still enjoys tinkering around with it in his free time. His projects can be found ",
    fullBio: "Peter Wagenet is a member of the SproutCore Core Team and a SproutCore engineer at Strobe. Prior to working at Strobe, Peter was also a Ruby on Rails engineer and still enjoys tinkering around with it in his free time. His projects can be found at <a href=\"http://github.com/rxcfc\" target=\"_blank\">http://github.com/rxcfc</a> and his Twitter at @wagenet."
  },
  {
    src: 'img/avatars/tyler-keating-large.jpg',
    name: "Tyler Keating",
    location: "Regina, SK, Canada",
    shortBio: "After finishing school at the University of Saskatchewan, Tyler began his career as an Engineering Manager at SaskTel in Regina.  A persistent desire to write software eventually led him to new work writing OS X desktop apps, Rails web ",
    fullBio: "After finishing school at the University of Saskatchewan, Tyler began his career as an Engineering Manager at SaskTel in Regina.  A persistent desire to write software eventually led him to new work writing OS X desktop apps, Rails web apps, iPhone & Blackberry mobile apps and most recently, SproutCore, best of all worlds, apps.  He currently works for Strobe Inc., where he works on improving SproutCore, developing applications and supporting other companies with their mobile strategies.<br><br>He lives in Regina Saskatchewan with his wife and two daughters."
  },
  {
    src: 'img/avatars/tom-dale-large.png',
    name: "Tom Dale",
    location: "San Francisco, CA, USA",
    shortBio: "Tom graduated from UC Irvine with a degree in criminology in 2008. He built an internal tool for the Apple retail stores in 2009, which was his first time using SproutCore, his first exposure to JavaScript, and his first time meeting Charles ",
    fullBio: "Tom graduated from UC Irvine with a degree in Criminology in 2008. He built an internal tool for the Apple retail stores in 2009, which was his first time using SproutCore, his first exposure to JavaScript, and his first time meeting Charles Jolley. From 2009 to the end of 2010, he helped maintain SproutCore at Apple and assisted building the next generation of their web applications. Now he works at Strobe where he couldn’t be more excited about making web applications the big thing instead of just the next big thing. In his spare time he runs a cash-for-beer exchange program at many local San Francisco dive bars."
  },
  {
    src: 'img/avatars/yehuda-katz-large.png',
    name: "Yehuda Katz",
    location: "San Francisco, CA, USA",
    shortBio: "Yehuda Katz is a member of the SproutCore, Ruby on Rails and jQuery Core Teams; during the daytime, he works as Chief Technologist at Strobe. Yehuda is the co-author of the best-selling jQuery in Action, the upcoming Rails 3 in Action and is a ",
    fullBio: "Yehuda Katz is a member of the SproutCore, Ruby on Rails and jQuery Core Teams; during the daytime, he works as Chief Technologist at Strobe. Yehuda is the co-author of the best-selling jQuery in Action, the upcoming Rails 3 in Action, and is a contributor to Ruby in Practice. He spends most of his time hacking on open source—his main projects, along with others, like Thor, Handlebars and Janus—or traveling the world doing evangelism work. He blogs at <a href=\"http://yehudakatz.om\" target=\"_blank\">http://yehudakatz.com</a> and can be found on Twitter as @wycats."
  }
];

app.coreMembers = (function() {
  // Called on jQuery ready
  app.ready.coreMembers = function() {
    var member,
        target,
        i, length;

    target = $('#core-team ul.shown');
    length = VISIBLE_MEMBERS.length;
    
    // Insert the visible members in the list dynamically
    for (i = 0; i < length; i++) {
      member = VISIBLE_MEMBERS[i];
      target.append('<li><img src="' + member.src + '"><h2>' + member.name + '</h2><i>' + member.location + '</i><p>' + member.shortBio + '<a href="#" onclick="app.setUpMemberModal(' + i + '); app.openModal($(\'#core-member-modal\')); return false;">...cont’d</a></p></li>');
    }
  };
})();

app.setUpMemberModal = function(index) {
  var modal = $('#core-member-modal'),
      target = $('#core-member-modal-content'),
      member,
      height;

  member = VISIBLE_MEMBERS[index];
  if (member) {
    // Replace the modal content with the source content
    target.html('<img src="' + member.src + '"><h2>' + member.name + '</h2><i>' + member.location + '</i><p>' + member.fullBio + '</p>');
  } else {
    console.warn('Unable to find source for core team member.');
  }
};