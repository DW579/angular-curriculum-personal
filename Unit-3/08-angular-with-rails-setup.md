#Angular And Rails: Basic Setup

To get started we are going to make an api for the contacts app.  Our api will be a rails applicaiton that just returns json.  Create the new app:

`rails new ContactsApp -TBd postgresql`

In the new `ContactsApp` directory, do: `rails g scaffold Contact name:text email:text phone:text`

In the `contacts_controller.rb` delete the `edit` and `new` action.
Remove all views: `rm -rf app/views/contacts`

Also, remove all of the `respond_to do |format|` logic.  Instead, just render json.  For example, the `create` action should look like this:

```ruby
def create
  @contact = Contact.new(contact_params)

  if @contact.save
    render json: @contact, status: :created
  else
    render json: @contact.errors, status: :unprocessable_entity
  end
end
```

**EXERCISE**

Change the remaining actions in the controller to only respond with json.  Why are the `edit` and `new` actions no longer needed?

![](http://rigor.com/wp-content/uploads/2014/09/angularjs+rails.jpg)

Your modified controller should look something like this:

```ruby
class ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :update, :destroy]

  # GET /contacts
  def index
    @contacts = Contact.all
    render json: @contacts, status: :ok
  end

  # GET /contacts/1
  def show
    render json: @contact, status: :ok   
  end

  # POST /contacts
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render json: @contact, status: :created
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contacts/1
  def update
    if @contact.update(contact_params)
      render json: @contact, status: :ok
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contacts/1
  def destroy
    @contact.destroy
    render json: @contact, status: ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      params.require(:contact).permit(:name, :email, :phone)
    end
end
```

**EXERCISE**

Make sure all of your new controller methods are working.  First, make a few contacts in the rails console. Then, make requests to each action to verify they work.  You will have to use something other than the browser to make the non GET requests.  Try using `curl` in the terminal or the Postman browser plugin.  **Hint**: You will probably run into CSRF issues when you get to the `destroy`, `update` and `create` methods.  To get around the issue **JUST FOR THIS EXERCISE**, remove the line in `application_controller.rb` that says `protect_from_forgery with: :exception`. Remember to put that line back when you're done with the exercise.

![](http://blog.getpostman.com/wp-content/uploads/2015/04/logo-postman-512--551cff77v1_site_icon.png)

Next, we'll set up angular in our app.  There is a gem for doing this called [angularjs-rails](https://github.com/hiravgandhi/angularjs-rails), but we're going to do it manually to get an idea of what is going on.

First, add the angularjs script tag in your `app/views/layouts/application.html.erb` file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ContactsApp</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular.min.js"></script>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>
 
   <%= yeild %>
   
</body>
</html>
```

Note that the angular js sript tag is **before** the erb tag that includes javascript.

Also, since we are not using rails views from our controllers, remove the `<%= yeild %>` tag.  Add, `ng-app` on the body tag and put an angular expression in the body to verify it's working:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ContactsApp</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular.min.js"></script>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body ng-app>
   {{5 + 5}}
</body>
</html>
```

Lastly, turbolinks is a gem that rails uses to cache ajax requests.  It can cause problems with angular, so let's remove it:

In the `app/assets/javascript/applications.js`, **remove** this line:

```js
//= require turbolinks
```

Also, you need to **remove** the following line from the `Gemfile`:

```ruby
gem 'trubolinks'
```

And finally, in `app/views/layouts/application.html.erb`, change your `javascript_include_tag` to not include turbolinks:

```html
<%= javascript_include_tag 'application', 'data-turbolinks-track' => false %>
```


**EXERCISE**

Go to the root of your application and see what happens.  Are we getting the angular app to show up?  Why not?  What could you do to your applicatoin to get it to return the layout when the user visits the root path.  **HINT** You'll probably have to change the `routes.rb` file and add a new controller.

![](http://www.amtrak.com/servlet/BlobServer?blobkey=id&blobwhere=1249232678738&blobheader=image%2Fgif&blobcol=urldata&blobtable=MungoBlobs)
![](http://ecx.images-amazon.com/images/I/81Q0l1t%2BaJL._SL1500_.jpg)


Your `routes.rb` file should look like this:

```ruby
Rails.application.routes.draw do
  root to: 'statics#index' 
  resources :contacts, only: [:index, :show, :create, :update, :destroy] 
end
```

And your new `StaticsController` should look like this:

```
class StaticsController < ApplicationController
  def index
  end
end
```

You'll also have to create a file `app/views/statics/index.html.erb` that is empty so that rails doesn't give you an error.

Now your rails app should return your layout page when you visit the root route and angular should load.

### Adding Angular Code

Next, we want to add some angular code to our rails app.  Inside `app/assets/javascript`, make a directory called `angular`.  Create the normal directory sturcture for you angular app inside of the angular directory.  You'll also have to make sure that the `app.js` file you created is the first angular file that gets loaded.  Your `app/assets/javascripts/application.js` file should look similar to this:

```js
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require angular/app
//= require_tree .
```

Let's verify our angular files are being loaded correctly.  Add this to your `app/assets/javascripts/angular/app.js` file.  Note that we are adding an `app.config` method to handle the CSRF token:

```js
var contactsApp = angular.module("ContactsApp", []);
contactsApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);
```

Add this to your `app/assets/javascripts/angular/controllers.js`:

```js
contactsApp.controller("ContactsController", ['$scope', function($scope) {
  $scope.testing = "Tim";
}]);
```

Lastly, in your `app/views/layouts/application.html.erb`, modify the layout to look like the following:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ContactsApp</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular.min.js"></script>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body ng-app="ContactsApp">
  <div ng-controller="ContactsController">
    {{testing}}
  </div>
</body>
</html>
```

**EXERCISE**

Verify that you're seeing the variable from the `$scope` that you expect.  Also, verify that the order of the javascript files included in your applicaiton is correct.  Remember, app.js should be included before any of your other angular files.

**EXERCISE**

Now that you have a working backend and a working angular front end, redo your angular contacts app with rails as your backend.  **HINT**:  You probably want to use an `ng-view` directive and the angular router so that you don't have to write a bunch of your code in the layout.  Also, you are going to have to make ajax calls to your rails backend using the `$http` services.

**BONUS**

Figure out how to use the `$resource` module to make your RESTful requests to your api.