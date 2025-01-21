import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:mobile/view/widget/change_password.dart';
import 'package:mobile/view/widget/logout.dart';
import 'package:mobile/view/widget/navbar.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  Future<Map<String, String?>> _getUserInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    String? name = prefs.getString('name');
    String? username = prefs.getString('username');
    String? image = prefs.getString('image');
    String? nip = prefs.getString('nip');
    String? mapel = prefs.getString('mapel');

    return {
      'name': name,
      'username': username,
      'image': image,
      'nip': nip,
      'mapel': mapel,
    };
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, String?>>(
      future: _getUserInfo(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            backgroundColor: Colors.white,
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (!snapshot.hasData || snapshot.data == null) {
          return Scaffold(
            backgroundColor: Colors.white,
            body: Center(child: Text('No profile data available')),
          );
        }

        var userInfo = snapshot.data!;
        return Scaffold(
          backgroundColor: Colors.white,
          body: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Stack(
                children: [
                  Container(
                    height: 250,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Color(0xFFF26A37),
                          Color(0xFFF98053),
                          Color(0xFFFF9B75),
                        ],
                        begin: Alignment.bottomLeft,
                        end: Alignment.topRight,
                      ),
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(30),
                        bottomRight: Radius.circular(30),
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          "Profile",
                          style: TextStyle(fontSize: 24, color: Colors.white),
                        ),
                        Gap(10),
                        Container(
                          height: 120,
                          width: 120,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: Colors.white,
                              width: 4,
                            ),
                          ),
                          child: ClipOval(
                            child: userInfo['image'] != null
                                ? Image.asset(
                                    "../../assets/${userInfo['image']}", // Image loaded from assets
                                    fit: BoxFit.cover,
                                  )
                                : Image.asset(
                                    "assets/pf.jpg", // Placeholder if no image exists
                                    fit: BoxFit.cover,
                                  ),
                          ),
                        ),
                        Gap(10),
                        Text(
                          userInfo['name'] ?? 'No Name',
                          style: TextStyle(fontSize: 20, color: Colors.white),
                        ),
                        Text(
                          userInfo['mapel'] ?? 'No Subject',
                          style: TextStyle(fontSize: 16, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Gap(20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Column(
                  children: [
                    // Username Field
                    Container(
                      padding: const EdgeInsets.only(bottom: 10.0),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: Colors.grey,
                            width: 1.0,
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.account_circle,
                                  size: 40, color: Colors.grey[700]),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Username",
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                  SizedBox(height: 5),
                                  Text(
                                    userInfo['username'] ?? 'No Username',
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 15),

                    // Name Field
                    Container(
                      padding: const EdgeInsets.only(bottom: 10.0),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: Colors.grey,
                            width: 1.0,
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.person,
                                  size: 40, color: Colors.grey[700]),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Name",
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                  SizedBox(height: 5),
                                  Text(
                                    userInfo['name'] ?? 'No Name',
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 15),

                    // NIP Field
                    Container(
                      padding: const EdgeInsets.only(bottom: 10.0),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: Colors.grey,
                            width: 1.0,
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.business,
                                  size: 40, color: Colors.grey[700]),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "NIP",
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                  SizedBox(height: 5),
                                  Text(
                                    userInfo['nip'] ?? 'No NIP',
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 15),

                    // Mapel (Subject) Field
                    Container(
                      padding: const EdgeInsets.only(bottom: 10.0),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: Colors.grey,
                            width: 1.0,
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.school,
                                  size: 40, color: Colors.grey[700]),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Mapel",
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                  SizedBox(height: 5),
                                  Text(
                                    userInfo['mapel'] ?? 'No Subject',
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 15),

                    // Password Field (Already Implemented)
                    Container(
                      padding: const EdgeInsets.only(bottom: 10.0),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: Colors.grey,
                            width: 1.0,
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Icon(Icons.lock_outline,
                                  size: 40, color: Colors.grey[700]),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Password",
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                  SizedBox(height: 5),
                                  Text(
                                    "*****",
                                    style: TextStyle(color: Colors.grey[600]),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          IconButton(
                            onPressed: () {
                              showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return ChangePasswordModal();
                                  });
                            },
                            icon: Icon(
                              Icons.edit,
                              color: Colors.grey,
                            ),
                            tooltip: "Change Password",
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Gap(10),
              LogoutButton()
            ],
          ),
          bottomNavigationBar: const Navbar(selectedIndex: 2),
        );
      },
    );
  }
}
