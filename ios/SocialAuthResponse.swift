//
//  SocialAuthResponse.swift
//  social-auth
//
//  Created by William Connelly on 30/3/21.
//

import Foundation

struct SocialAuthResponse {
    
    let token: String
    let firstName: String
    let lastName: String
    let email: String
    let phone: String
    let imageUrl: String
    
    var toDictionary: [String: Any] {
        return [
            "token": self.token,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "phone": self.phone,
            "imageUrl": self.imageUrl
        ]
    }
}
