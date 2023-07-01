# Todo list

## Misc

- Add accessibility aria into all components
- replace "stampInfoDetailed" dataset with just a bunch of individual markdown
  files that are embedded within the page so you can add images and such
- make navbar look proper

## Catalog

- make tooltips have opaque background
- sort-by capability - note that you can have both filtering and sorting at the
  same time
- the tooltips should have an edit button to directly edit stamps. Note that
  sets should be edited all together, so editing one will edit them all
- create a custom and dynamic stamp page background w/ pure css or something
  crazy like that

## Upload

- implement upload capabilities for sets
- create second column for interactive preview, to show what the stamp will look
  like in the catalog
- BUG: There is some kind of error sometimes when uploading a single stamp. not
  sure how to debug it

## Settings screen

- add table or tree structure to update/edit stamps
- add table to update/edit tags

## Data

- implement central storage to hold local version of tags and stamps. And this
  is the singular endpoint within the app where we communicate with backend
- there should be an initialization handler, where all data is retrieved and
  stored
- authentication/security measures

## Stretch Goals

- Make a split-flap display type thing where you can connect this app and it'll
  physically flip to the stamps you're viewing
