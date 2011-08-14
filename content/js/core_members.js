/*globals app */

/** v-- Insert into script.js? --v **/
// This is the list of core team members info (ordered by first name)
var VISIBLE_MEMBERS = [{
  name: "Charles Jolley",
  location: "Los Altos, CA, USA",
  shortBio: "Charles Jolley is Founder and CEO of Strobe, a software and cloud services company focused on the mobile web. He is also the creator of the",
  fullBio: "Charles Jolley is Founder and CEO of Strobe, a software and cloud services company focused on the mobile web. He is also the creator of the SproutCore open source framework. Before founding Strobe, Charles was responsible for Mobile Me application development at Apple.",
  gravatar: "f052bd6b4781bf15d8abcce3ee0db542",
  twitter: "okito",
  github: "charlesjolley"
},
{
  name: "Colin Campbell",
  location: "St. John’s, Newfoundland, Canada",
  shortBio: "Colin has a background in web development, and works for Strobe writing mobile applications. He has mostly worked on media and publishing apps for",
  fullBio: "Colin has a background in web development, and works for Strobe writing mobile applications. He has mostly worked on media and publishing apps for iPhone, Android, iPad and desktop. Before joining Strobe in July ’10, he worked in advertising, using mostly Flash and jQuery. He believes wholeheartedly that SproutCore is the best way to make kickass apps.",
  gravatar: "fb559cf5759e7a380531a7912c3df366",
  twitter: "colin_campbell",
  github: "colincampbell"
},
{
  name: "Evin Grano",
  location: "Culpepper, VA, USA",
  shortBio: "Evin has been working with Sproutcore ever since he took his job at Eloqua in 2008. Working closely with a large team of developers, Evin was the",
  fullBio: "Evin has been working with Sproutcore ever since he took his job at Eloqua in 2008. Working closely with a large team of developers, Evin was the Technical and Team Lead for developing one of the largest Sproutcore Application at Eloqua. Evin joined the SproutCore Core Team about 2 years ago because of his contributions to the core framework (Statecharts, Nested Records) and his work on the widely used 3rd party frameworks for SproutCore: SproutCore-UI (SCUI), SproutCore Universal DataSource (SCUDS), and Sai, a vector graphics library for SproutCore. He has been a contributor to Greenhouse, SpoutCore’s UI builder, with fellow core member Mike Ball. Evin has done talks about SproutCore for local meetups and JSConf 2009 and sometime posts to his blog about SproutCore.",
  gravatar: "7a4f4b203c2151d9d5466e6673ef09d3",
  twitter: "etgryphon",
  github: "etgryphon"
},
{
  name: "Majd Taby",
  location: "San Francisco, CA, USA",
  shortBio: "Majd graduated from The University of Michigan with a B.S. in Computer Science in 2010. He started his career at Apple, where he helped build the",
  fullBio: "Majd graduated from The University of Michigan with a B.S. in Computer Science in 2010. He started his career at Apple, where he helped build the MobileMe Gallery iPad/iPhone app. He also helped maintain the SproutCore framework and contributed to the various MobileMe web application. Now he works at Strobe where he is building SproutCore UI. Talk to him about drawing, biking, running, tailoring, or design.",
  gravatar: "6a4524a5dd3c32b3fd2e707bbc39034e",
  twitter: "jtaby",
  github: "jtaby"
},
{
  name: "Michael Cohen",
  location: "San Francisco, CA, USA",
  shortBio: "Starting with Eloqua to help build the company’s new Eloqua10 user interface that is entirely based on SproutCore, Michael has been involved with the",
  fullBio: "Starting with Eloqua to help build the company’s new Eloqua10 user interface that is entirely based on SproutCore, Michael has been involved with the framework for two years. As a core team member, he is the creator of two SproutCore frameworks: Ki, a full featured statechart framework that is now part of latest SproutCore release, version 1.5; and Lebowski, a test integration framework for SproutCore applications. Michael also maintains a blog focused on helping people learn about SproutCore.",
  gravatar: "6ba4af0503707f6c06ab7c483398232f",
  twitter: "frozencanuck",
  github: "frozencanuck"
},
{
  name: "Mike Ball",
  location: "Fairfax, VA, USA",
  shortBio: "Mike has been involved with SproutCore for nearly 3 years. During that period he used SproutCore to transform Eloqua's UX. As a core team member",
  fullBio: "Mike has been involved with SproutCore for nearly three years. During that period he used SproutCore to transform Eloqua’s UX. As a core team member Mike has been primarily involved developing SpoutCore’s UI builder Greenhouse and its associated frameworks and infrastructure. Mike has also contributes to the SproutCore-UI and SproutCore Universal Datastore frameworks, and on rare occasions posts to his blog about SproutCore design patterns.",
  gravatar: "d9521d99eca89a292587e659c09b6726",
  twitter: "onkis",
  github: "onkis"
},
{
  name: "Peter Wagenet",
  location: "Orange County, CA, USA",
  shortBio: "Peter Wagenet is a member of the SproutCore Core Team and a SproutCore engineer at Strobe. Prior to working at Strobe, Peter was also a Ruby on Rails",
  fullBio: "Peter Wagenet is a member of the SproutCore Core Team and a SproutCore engineer at Strobe. Prior to working at Strobe, Peter was also a Ruby on Rails engineer and still enjoys tinkering around with it in his free time. His projects can be found at <a href=\"http://github.com/wagenet\" target=\"_blank\">http://github.com/wagenet</a> and his Twitter at @wagenet.",
  gravatar: "88a1521be4c8a667dbb7d61e68cc0668",
  twitter: "wagenet",
  github: "wagenet"
},
{
  name: "Tyler Keating",
  location: "Regina, SK, Canada",
  shortBio: "After finishing school at the University of Saskatchewan, Tyler began his career as an Engineering Manager at SaskTel in Regina. A",
  fullBio: "After finishing school at the University of Saskatchewan, Tyler began his career as an Engineering Manager at SaskTel in Regina. A persistent desire to write software eventually led him to new work writing OS X desktop apps, Rails web apps, iPhone & Blackberry mobile apps and most recently, SproutCore, best of all worlds, apps.  He currently works for Strobe Inc., where he works on improving SproutCore, developing applications and supporting other companies with their mobile strategies.</p><p>He lives in Regina Saskatchewan with his wife and two daughters.",
  gravatar: "a2367cda30e6c3ecf60e65c2fe824b0d",
  twitter: "tylerkeating",
  github: "publickeating"
},
{
  name: "Tom Dale",
  location: "San Francisco, CA, USA",
  shortBio: "Tom graduated from UC Irvine with a degree in criminology in 2008. He built an internal tool for the Apple retail stores in 2009, which was his first time",
  fullBio: "Tom graduated from UC Irvine with a degree in Criminology in 2008. He built an internal tool for the Apple retail stores in 2009, which was his first time using SproutCore, his first exposure to JavaScript, and his first time meeting Charles Jolley. From 2009 to the end of 2010, he helped maintain SproutCore at Apple and assisted building the next generation of their web applications. Now he works at Strobe where he couldn’t be more excited about making web applications the big thing instead of just the next big thing. In his spare time he runs a cash-for-beer exchange program at many local San Francisco dive bars.",
  gravatar: "c051ad9e549b0e19233004ab4404ff10",
  twitter: "tomdale",
  github: "tomdale"
},
{
  name: "Yehuda Katz",
  location: "San Francisco, CA, USA",
  shortBio: "Yehuda Katz is a member of the SproutCore, Ruby on Rails and jQuery Core Teams; during the daytime, he works as Chief Technologist at Strobe.",
  fullBio: "Yehuda Katz is a member of the SproutCore, Ruby on Rails and jQuery Core Teams; during the daytime, he works as Chief Technologist at Strobe. Yehuda is the co-author of the best-selling jQuery in Action, the upcoming Rails 3 in Action, and is a contributor to Ruby in Practice. He spends most of his time hacking on open source—his main projects, along with others, like Thor, Handlebars and Janus—or traveling the world doing evangelism work. He blogs at <a href=\"http://yehudakatz.com\" target=\"_blank\">http://yehudakatz.com</a> and can be found on Twitter as @wycats.",
  gravatar: "428167a3ec72235ba971162924492609",
  twitter: "wycats",
  github: "wycats"
}];

app.coreMembers = (function() {
  // Called on jQuery ready
  app.ready.coreMembers = function() {
    var member, target, i, length;

    target = $('#core-team ul.shown');
    length = VISIBLE_MEMBERS.length;

    // Insert the visible members in the list dynamically
    for (i = 0; i < length; i++) {
      member = VISIBLE_MEMBERS[i];
      target.append('<li><div class="social"><img src="http://www.gravatar.com/avatar/' + member.gravatar + '?s=128" alt="Picture of ' + member.name + '" /><ul><li><a href="http://twitter.com/' + member.twitter + '">Twitter</a></li><li><a href="https://github.com/' + member.github + '" class="github">GitHub</a></li></ul></div><h2>' + member.name + '</h2><i>' + member.location + '</i><p>' + member.shortBio + '<br /><a href="#" onclick="app.setUpMemberModal(' + i + '); app.openModal($(\'#core-team-modal\')); return false;">...cont’d</a></p></li>');
    }
  };
})();

app.setUpMemberModal = function(index) {
  var modal = $('#core-team-modal'),
  target = $('#core-team-modal-content'),
  member,
  height;

  member = VISIBLE_MEMBERS[index];
  if (member) {
    // Replace the modal content with the source content
    target.html('<div class="social"><img src="http://www.gravatar.com/avatar/' + member.gravatar + '?s=128" alt="Picture of ' + member.name + '" /><ul><li><a href="http://twitter.com/' + member.twitter + '">Twitter</a></li><li><a href="https://github.com/' + member.github + '" class="github">GitHub</a></li></ul></div><h2>' + member.name + '</h2><i>' + member.location + '</i><p>' + member.fullBio + '</p>');
  } else {
    console.warn('Unable to find source for core team member.');
  }
};

// Team Spotlight on homepage
app.memberSpotlight = (function() {
  app.ready.memberSpotlight = function() {
    var member, target;
    member = VISIBLE_MEMBERS[Math.floor(Math.random() * VISIBLE_MEMBERS.length)];
    target = $('#home #spotlight article');
    target.append('<header><img src="http://www.gravatar.com/avatar/' + member.gravatar + '?s=32" alt="Picture of ' + member.name + '" /><hgroup><h1>' + member.name + '</h1><h2>' + member.location + '</h2></hgroup></header><p>' + member.fullBio + '</p>');
  };
})();