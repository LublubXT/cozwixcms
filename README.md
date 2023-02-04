# Cozwix CMS
![cozwixlogo](https://user-images.githubusercontent.com/73581388/216761560-c6d10713-605b-4360-aeff-521bbf6ec914.svg)

### The first open source NodeJS, EJS, ExpressJS, and Mongodb CMS!
This is the very first version of Cozwix CMS. It is very simple and easy to use and setup. I have been looking for a CMS that I could use to build websites with Ejs, ExpressJS, and Mongodb, but I couldn't find any. That is why I built Cozwix CMS. 

### Simple Login
![login](https://user-images.githubusercontent.com/73581388/216762919-eac68efa-32ac-438e-be10-5ac8f28fcc66.png)

### Simple yet beautiful design
![home](https://user-images.githubusercontent.com/73581388/216762953-5329ae4e-b78d-4739-a02c-d532277540e2.png)

### Edit or Delete posts easily
To delete a post, simply double-click the delete button. To edit a post, click the Edit button.

![posts](https://user-images.githubusercontent.com/73581388/216763053-a24e8d1c-67ce-45e5-9d20-41ba860483c3.png)

### Create and Edit Posts
![createpost](https://user-images.githubusercontent.com/73581388/216763124-cd75759c-a66c-4cd7-b285-7ebdabb8562d.png)

### Basic Components
Component List:
- [x] Heading 1-4
- [x] Paragraph
- [x] Image
- [x] Video
- [x] Audio
- [ ] Rich Text (quillJS)
- [ ] Download
- [ ] Image Gallery
- [ ] Quote
- [ ] Link

![newitem](https://user-images.githubusercontent.com/73581388/216763168-653bb505-1ee3-4a07-9196-d26e76096071.png)

### Simple text alignment
![align](https://user-images.githubusercontent.com/73581388/216763141-efd1dd0a-3ee2-4301-8e0a-3e90de2f9600.png)

# Get Started with Cozwix CMS
1. Download this repo
2. Open terminal in project and type `npm i`. This will install all the dependencies needed.
3. Open the `variables.js` file and look at line 4. If you are using Mongodb Atlas, then put in your connection string. If you are using your local Mongodb database, then you should be able to leave it the same. Otherwise, you will need to change the address.
4. Once you are connected to your Mongodb database, run `node index.js` or if you have nodemon run `nodemon index.js`. Once the server is running, open your browser and go to `http://localhost:3001/admin/`. The username and password is `admin`. If you want to change the username and password, which I would recomend, go to the `setupdata.json` file and change the username and password there. 
5. Once you are loged in, click the `New Post` button. 

![newpost](https://user-images.githubusercontent.com/73581388/216764173-8f6a01f6-225d-47ec-bbe0-ff2248d7f7e1.png)

6. Upload your post header image, and fill in everything else, then click `Next`.
7. To add an item, click the green `Add Item` button, and click which item you want to add. 
8. Once you have finnished adding all the items to your post, click the green `Save` button in the top right corner. Now you have made your first post!
9. To go to the home page, go `http://localhost:3001/`, and you should see the post you made! All the other links in the navbar should work.

# Coming soon
- [ ] [Coming Next] How to build your own template for the cms.
- [ ] Other Docs
- [ ] Official Website
