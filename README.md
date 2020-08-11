# Domainario

Simple extension for quick and easy URL replacements with a click of a button or a tap of a shortcut. 

Set your default update to allow you to append or replace some text to the end of your url and open in new tab. 

Create exceptions to detect certain simple patterns in your url and excecute different appends or replacements useful for quick access to your web backend portals especially for those working with multiple clients or CMS's.

Chrome Extension(CH) version 0.0.0.2 nearly complete
-------------------
Options available 

Default Options
---------------------
Default Replace path: 
Default is set to "/login" however you may use any simple text string.
 
Default replace path is case sensative: 
Will apply your default text in exact casing if checked otherwise lowercase

Default path appends to the end of the URL:
If checked default will append to the end of current url ortherwise it will append to the end of the host domain
eg:
	if checked:
	1. https://github.com/anauthdes + default
	if unchecked:
	2. https://github.com + default

Exception Options
---------------------
Expection: 
Text string to be searched for in url

Result: 
Text string to use if condition is met for exception

Replace Text:
If checked Result will replace Exception in URL.
Eg:
	if checked
	1. ex: foo re: bar 
		foo.com -> bar.com
		anotherfooinurl.com -> anotherbarinurl.com

Case sensative:
If checked the condition for the exception will be checked as is case sentsative in the url
eg:
	if checked
	1. ex: fOo re:bar
		foo.com -> foo.com
		fOo.com -> bar.com
		anotherfOosite.com -> anotherbarsite.com
		anotherfoosite.com -> anotherfoosite.com

Append:
If checked result will append to the end of the current URL if conditions for exception are met otherwise result will append to host domain
eg:
	if checked:
	ex: anauthdes re: foo
	1. https://github.com/anauthdes + re
	if unchecked:
	2. https://github.com + re

NOTE: in exception options Replace and Append can be used at the same time on the same option(this may cause some oddd results but is a valid outcome)
eg:
	1.if both Replace and Append are checked:
	ex:foo re bar
	sitewithfoo.com -> sitewithbar.combar




NOTE: FF is still a WIP
-------------------
ERRORS WHILE LOADING FROM LOCAL TO FF will proceed with temp server testing


 
