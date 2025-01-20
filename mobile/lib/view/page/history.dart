import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

class History extends StatelessWidget {
  const History({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "30 Hari Terakhir",
            style: TextStyle(
                color: Colors.black, fontWeight: FontWeight.bold, fontSize: 20),
          ),
          Gap(12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                Container(
                  width: 100,
                  height: 120,
                  padding: EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.circular(15),
                      boxShadow: [
                        BoxShadow(
                            color: Color.fromARGB(99, 0, 0, 0),
                            blurRadius: 5,
                            offset: Offset(0, 3))
                      ]),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.groups_2,
                        size: 36,
                        color: Colors.white,
                      ),
                      Text(
                        "Hadir",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "10",
                        style: TextStyle(color: Colors.white),
                      )
                    ],
                  ),
                ),
                SizedBox(width: 16),
                Container(
                  width: 100,
                  height: 120,
                  padding: EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                      color: Colors.blue,
                      borderRadius: BorderRadius.circular(15),
                      boxShadow: [
                        BoxShadow(
                            color: Color.fromARGB(99, 0, 0, 0),
                            blurRadius: 5,
                            offset: Offset(0, 3))
                      ]),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.date_range_outlined,
                        size: 36,
                        color: Colors.white,
                      ),
                      Text(
                        "Ijin",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "10",
                        style: TextStyle(color: Colors.white),
                      )
                    ],
                  ),
                ),
                SizedBox(width: 16),
                Container(
                  width: 100,
                  height: 120,
                  padding: EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                      color: Colors.yellow[500],
                      borderRadius: BorderRadius.circular(15),
                      boxShadow: [
                        BoxShadow(
                            color: Color.fromARGB(99, 0, 0, 0),
                            blurRadius: 5,
                            offset: Offset(0, 3))
                      ]),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.access_time_filled,
                        size: 36,
                        color: Colors.white,
                      ),
                      Text(
                        "Terlambat",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "10",
                        style: TextStyle(color: Colors.white),
                      )
                    ],
                  ),
                ),
                SizedBox(width: 16),
                Container(
                  width: 100,
                  height: 120,
                  padding: EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(15),
                      boxShadow: [
                        BoxShadow(
                            color: Color.fromARGB(99, 0, 0, 0),
                            blurRadius: 5,
                            offset: Offset(0, 3))
                      ]),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.local_hospital_rounded,
                        size: 36,
                        color: Colors.white,
                      ),
                      Text(
                        "Sakit",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "10",
                        style: TextStyle(color: Colors.white),
                      )
                    ],
                  ),
                ),
                SizedBox(width: 16),
                Container(
                  width: 100,
                  height: 120,
                  padding: EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                      color: Colors.grey,
                      borderRadius: BorderRadius.circular(15),
                      boxShadow: [
                        BoxShadow(
                            color: Color.fromARGB(99, 0, 0, 0),
                            blurRadius: 5,
                            offset: Offset(0, 3))
                      ]),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.cancel_outlined,
                        size: 36,
                        color: Colors.white,
                      ),
                      Text(
                        "Alfa",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "10",
                        style: TextStyle(color: Colors.white),
                      )
                    ],
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
