import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'dart:async';
import 'package:mobile/api.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Absent extends StatefulWidget {
  const Absent({super.key});

  @override
  State<Absent> createState() => _AbsentState();
}

class _AbsentState extends State<Absent> {
  String masukTime = '--:--';
  String keluarTime = '--:--';
  bool isLoading = true;
  String? errorMessage;
  int? userId;

  @override
  void initState() {
    super.initState();
    _loadUserId();
  }

  Future<void> _loadUserId() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      userId = prefs.getInt('userId');
    });

    // After the userId is loaded, fetch the absent data if the userId is not null
    if (userId != null) {
      fetchAbsent(userId!);
    }
  }

  Future<void> fetchAbsent(int userId) async {
    try {
      final response = await ApiService.getAbsent(userId);

      if (response.containsKey('data')) {
        List<dynamic> absentList = response['data'];

        setState(() {
          // Process the 'masuk' or 'terlambat' time (combine logic to avoid redundancy)
          var masukData = absentList.firstWhere(
            (a) => a['type'] == 'masuk' || a['type'] == 'terlambat',
            orElse: () => {},
          );

          var keluarData = absentList.firstWhere(
            (a) => a['type'] == 'keluar',
            orElse: () => {},
          );

          masukTime = masukData['TIME'] != null
              ? formatTime(masukData['TIME'])
              : '--:--';

          keluarTime = keluarData['TIME'] != null
              ? formatTime(keluarData['TIME'])
              : '--:--';

          isLoading = false;
        });
      } else {
        setState(() {
          errorMessage = response['error'] ?? 'Unknown error';
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = 'An error occurred: $e';
        isLoading = false;
      });
    }
  }

  String formatTime(String time) {
    return time.substring(0, 5); // Formats the time to 'HH:mm'
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
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
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : errorMessage != null
                ? Center(
                    child: Text(
                      errorMessage!,
                      style: const TextStyle(color: Colors.red),
                    ),
                  )
                : Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      // MASUK Section
                      Column(
                        children: [
                          const Text(
                            'MASUK',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 14,
                            ),
                          ),
                          const Gap(5),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            decoration: BoxDecoration(
                              color: Colors.green[200],
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              masukTime,
                              style: const TextStyle(
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
                      // KELUAR Section
                      Column(
                        children: [
                          const Text(
                            'KELUAR',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 14,
                            ),
                          ),
                          const Gap(5),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            decoration: BoxDecoration(
                              color: Colors.red[200],
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              keluarTime,
                              style: const TextStyle(
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
    );
  }
}
