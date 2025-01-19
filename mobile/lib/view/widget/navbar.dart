import 'package:flutter/material.dart';
import 'package:mobile/view/page/dashboard.dart';
import 'package:mobile/view/page/profile.dart';
import 'package:mobile/view/page/report.dart';

class Navbar extends StatefulWidget {
  final int selectedIndex;
  const Navbar({super.key, required this.selectedIndex});

  @override
  _NavbarState createState() => _NavbarState();
}

class _NavbarState extends State<Navbar> {
  Future<void> _onItemTapped(int index) async {
    if (widget.selectedIndex == index) return;

    switch (index) {
      case 0:
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomePage()));
        break;
      case 1:
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const Report()));
        break;
      case 2:
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const ProfilePage()));
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 70,
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10,
          ),
        ],
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          IconButton(
            icon: Icon(
              Icons.home,
              color: widget.selectedIndex == 0 ? Colors.orange : Colors.grey,
              size: 30,
            ),
            onPressed: () => _onItemTapped(0),
          ),
          IconButton(
            icon: Icon(
              Icons.book,
              color: widget.selectedIndex == 1 ? Colors.orange : Colors.grey,
              size: 30,
            ),
            onPressed: () => _onItemTapped(1),
          ),
          IconButton(
            icon: Icon(
              Icons.person,
              color: widget.selectedIndex == 2 ? Colors.orange : Colors.grey,
              size: 30,
            ),
            onPressed: () => _onItemTapped(2),
          ),
        ],
      ),
    );
  }
}
