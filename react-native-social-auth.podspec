require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-social-auth"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/vaultgroup/rn-social-auth.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.resources = "react-native-social-auth/Assets/*"

  s.dependency "React-Core"
  s.dependency "GoogleSignIn", "6.1.0"
  s.dependency "FBSDKLoginKit", "12.3.1"
end
