# Todo list

## Misc

- Add accessibility aria into all components
- replace "stampInfoDetailed" dataset with just a bunch of individual markdown
  files that are embedded within the page so you can add images and such
- make navbar look proper
- make a theme file

## Catalog

- make tooltips have opaque background
- sort-by capability - note that you can have both filtering and sorting at the
  same time
- the tooltips should have an edit button to directly edit stamps. Note that
  sets should be edited all together, so editing one will edit them all
- create a custom and dynamic stamp page background w/ pure css or something
  crazy like that

## Upload

- create second column for interactive preview, to show what the stamp will look
  like in the catalog
- BUG: There is some kind of error sometimes when uploading a single stamp. not
  sure how to debug it
- add "height" attribute to the upload screen

## Settings screen

### Stamps table

- add table or tree structure to update/edit stamps
- should have a description column
- implement editable functionality for each row

### Tags table

- add table to update/edit tags
- add button to create a tag

## Data

- `retrieveCatalog` and `retrieveTags` are implemented slightly different with
  how they return values
- storing owned is "on/false" instead of "true/false" in firebase
- stamp sets need to all have a name AND description for each stamp
- implement central storage to hold local version of tags and stamps. And this
  is the singular endpoint within the app where we communicate with backend
- there should be an initialization handler, where all data is retrieved and
  stored
- authentication/security measures

## Stretch Goals

- Make a split-flap display type thing where you can connect this app and it'll
  physically flip to the stamps you're viewing

## Server

Add user authentication (but make it optional)

- display log in/out errors in UI

Restrict realtime database / storage rules:

- anyone can read
- only i can write (which means only i need to be authenticated)

Stretch goal: create different user roles so we can restrict reading even more -
maybe random users can only access a portion of the database as to not overwhelm
the server
