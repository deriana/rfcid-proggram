import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:mobile/view/widget/navbar.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

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
                  image: DecorationImage(
                    image: AssetImage('../../assets/dashboard_bg.png'),
                    fit: BoxFit.cover,
                    alignment: Alignment.center,
                  ),
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(30),
                    bottomRight: Radius.circular(30),
                  ),
                ),
              ),
            ],
          ),
          Gap(20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Selamat Pagi!",
                      style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black),
                    ),
                    Text(
                      "Frieren No Slayer",
                      style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w400,
                          color: Colors.grey[400]),
                    )
                  ],
                ),
                Spacer(),
                ClipOval(
                  child: Image.asset(
                    "../../assets/pf.jpg",
                    height: 50,
                    width: 50,
                    fit: BoxFit.cover,
                  ),
                ),
              ],
            ),
          ),
          Gap(20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.orange,
                borderRadius: BorderRadius.circular(15),
                boxShadow: [
                  BoxShadow(
                    color: const Color.fromARGB(99, 0, 0, 0),
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text(
                        'Hari ini, Senin.',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Icon(
                        Icons.wb_sunny,
                        color: Colors.yellow,
                      )
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildDateInfo('DATE', '01'),
                      _buildDateInfo('MONTH', 'JAN'),
                      _buildDateInfo('YEAR', '2025'),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Gap(20),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(15),
                boxShadow: [
                  BoxShadow(
                    color: const Color.fromARGB(99, 0, 0, 0),
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    children: [
                      Text(
                        'MASUK',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 14,
                        ),
                      ),
                      Gap(5),
                      Container(
                        padding: EdgeInsets.only(left: 20, right: 20),
                        decoration: BoxDecoration(
                          color: Colors.green[200],
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '08:00',
                          style: TextStyle(
                            color: Colors.green,
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10.0),
                    child: Text(
                      '|',
                      style: TextStyle(
                        fontSize: 50,
                        color: Colors.grey[300],
                      ),
                    ),
                  ),
                  Column(
                    children: [
                      Text(
                        'KELUAR',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 14,
                        ),
                      ),
                      Gap(5),
                      Container(
                        padding: EdgeInsets.only(left: 20, right: 20),
                        decoration: BoxDecoration(
                          color: Colors.red[200],
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '17:00',
                          style: TextStyle(
                            color: Colors.red,
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Gap(20),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: GridView.builder(
                shrinkWrap: true,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 15,
                  mainAxisSpacing: 15,
                ),
                itemCount: 5,
                itemBuilder: (context, index) {
                  return _buildHistoryCard(index);
                },
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const Navbar(selectedIndex: 0),
    );
  }

  Widget _buildDateInfo(String label, String value) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 14,
          ),
        ),
        Gap(5),
        SizedBox(
          width: 60,
          height: 20,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8.0),
            ),
            child: Center(
              child: Text(
                value,
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 12,
                ),
              ),
            ),
          ),
        )
      ],
    );
  }

  Widget _buildHistoryCard(int index) {
    List<Map<String, dynamic>> historyItems = [
      {
        'title': 'Hadir',
        'value': '80',
        'color': Colors.green,
        'icon': Icons.check_circle
      },
      {
        'title': 'Terlambat',
        'value': '5',
        'color': Colors.orange,
        'icon': Icons.access_time
      },
      {
        'title': 'Ijin',
        'value': '3',
        'color': Colors.blue,
        'icon': Icons.cancel_outlined
      },
      {'title': 'Alfa', 'value': '2', 'color': Colors.red, 'icon': Icons.block},
      {
        'title': 'Sakit',
        'value': '1',
        'color': Colors.purple,
        'icon': Icons.health_and_safety
      },
    ];

    return Container(
      padding: const EdgeInsets.all(12.0),
      decoration: BoxDecoration(
        color: historyItems[index]['color'],
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: const Color.fromARGB(99, 0, 0, 0),
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            historyItems[index]['icon'],
            size: 40,
            color: Colors.white,
          ),
          Gap(10),
          Text(
            historyItems[index]['title'],
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            historyItems[index]['value'].toString(),
            style: const TextStyle(
              color: Colors.white,
              fontSize: 30,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
