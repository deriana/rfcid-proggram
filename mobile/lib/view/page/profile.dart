import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:mobile/view/widget/logout.dart';
import 'package:mobile/view/widget/navbar.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
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
                        child: Image.asset(
                          "../../assets/pf.jpg",
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    Gap(10),
                    Text(
                      "Frieren",
                      style: TextStyle(fontSize: 20, color: Colors.white),
                    ),
                    Text(
                      "Teacher - Zoltraak",
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
            child: Container(
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
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Icon(Icons.account_circle, size: 40, color: Colors.grey[700]),
                  Gap(10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Users",
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                      Gap(5),
                      Text(
                        "Example@gmail.com",
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                  Gap(10)
                ],
              ),
            ),
          ),
          Gap(10),
          LogoutButton()
        ],
      ),
      bottomNavigationBar: const Navbar(selectedIndex: 2),
    );
  }
}
