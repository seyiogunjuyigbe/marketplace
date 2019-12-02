export const googleHelp = (accessToken,
    refreshToken,
    profile,
    done) => {

    User.findOne({googleID: profile.id})
        .then(currentUser => {
          console.log(profile)
            if(!currentUser) {
                let newUser = {
                    username: profile.displayName,
                    googleID: profile.id,
                    name: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName
                    }
                };

                new User(newUser)
                    .save()
                    .then(res => {
                        console.log(`New user created: ${res}`);
                        done(null, currentUser)
                    })
                    .catch(err => {
                        console.log(`Error while creating new user: ${err}`);
                        done(true, currentUser)
                    })
            }
            else{
                console.log(`User loged in: ${currentUser}`);
                done(null, currentUser)
            }
        })
}