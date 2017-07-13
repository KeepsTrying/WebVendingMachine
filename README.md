# WebVendingMachine


web vending machine using ajax calls to consume api

javascript and jquery used for button functionality

i did not spend a lot of time making it pretty, concentrated more on functionality.

used css to style buttons as a group, so used .on() to change the background of the items when hovering over to mimick buttons.  thought it would be faster than adding different classes to the buttons and item div's and styling them differently.  we were taught .hover in the curriculum, though i soon found out it was deprecated and i had to move to .on() which still did not work.  after reasearching I found that the dynamically loaded content could not be selected by normal means (direct event) and i had to utilize a delegated event selector of a child element.  all in all, a very valuable learning experience.  took longer the first time than styling with the buttons, but i do not believe anyone else in the class used the .on() to alter dynamically loaded content.
