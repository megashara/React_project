function UserProfile(){
  
  this.getName = function() {
    return UserProfile.full_name;
  };

  this.setName = function(name) {
    UserProfile.full_name = name;     
  };

}

UserProfile.full_name;

export default UserProfile;