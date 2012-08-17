octopress-calendar-aside
========================

Show a calendar(as aside) with clickable dates to your posts in octopress.

This plugin creates a calendar, which can be propogated by month and the dates automatically link to the posts you have created.
So lets say your posts were created on 11th August, 25th August, 13th July etc. the dates on the calendar are programmatically linked to your posts created on these dates.
All this without ANY manual configuration.

All you need to do is:
- add the file calendar.html to the default asides location. (.themes/classic/source/_includes/asides)
- add the file calendar.js to the default javascript location. (.themes/classic/source/javascript)
- add the calendar aside to _config.yml file. (see the config.yml in commited source)
- add the images prev.png and next.png to .themes/classic/source/images/. (these images are free for non-commercial purposes)


And voila, just do a rake generate and push your blog code, you should see the calendar aside up and running on your blog.

----
About the author:

Neeraj Kumar is an Engineer working for the Gmail team at Google,India.
A coffee/tea addict, he loves reading about HCI techniques and you would find his new HTML5 baked blog at http://neerajkumar.net

He also likes to work on creating mobile applications, and has had a few stints with phonegap and native android development.

