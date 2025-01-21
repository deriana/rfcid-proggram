import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:intl/intl.dart'; // Import Intl for DateTime formatting
import 'package:mobile/view/widget/date_picker.dart';
import 'package:mobile/api.dart'; // Import the API service

class RecapReport extends StatefulWidget {
  const RecapReport({super.key});

  @override
  _RecapReportState createState() => _RecapReportState();
}

class _RecapReportState extends State<RecapReport> {
  bool isLoading = true;
  List<Map<String, dynamic>> recapData = [];
  String startDate = "";
  String endDate = "";
  int userId = 51; // Hardcoded userId for testing

  Future<void> fetchRecapData() async {
    if (startDate.isEmpty || endDate.isEmpty) {
      print("Please select a start and end date");
      return;
    }

    var response = await ApiService.getReportRecap(userId, startDate, endDate);


    if (response['status'] == 'success') {
      setState(() {
        recapData = List<Map<String, dynamic>>.from(response['data']);
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });
      print("Failed to fetch data");
    }
  }

  @override
  void initState() {
    super.initState();
  }

  String formatDate(String dateTimeStr) {
    try {
      DateTime dateTime = DateTime.parse(dateTimeStr);
      return DateFormat('dd-MM-yyyy - HH:mm').format(dateTime);
    } catch (e) {
      return dateTimeStr;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
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
        ),
        title: const Text(
          "Laporan Recap Absensi",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DateRangePickerWidget(
              onDateRangeSelected: (start, end) {
                setState(() {
                  startDate = start;
                  endDate = end;
                });
                fetchRecapData();
              },
            ),
            const Gap(20),

            // Table Headers
            Container(
              color: const Color(0xFFFF9B75),
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              child: Row(
                children: const [
                  Expanded(
                      flex: 2,
                      child:
                          Text("Nama", style: TextStyle(color: Colors.white))),
                  Expanded(
                      flex: 2,
                      child:
                          Text("Hadir", style: TextStyle(color: Colors.white))),
                  Expanded(
                      flex: 2,
                      child: Text("Terlambat",
                          style: TextStyle(color: Colors.white))),
                  Expanded(
                      flex: 2,
                      child:
                          Text("Ijin", style: TextStyle(color: Colors.white))),
                  Expanded(
                      flex: 2,
                      child:
                          Text("Alfa", style: TextStyle(color: Colors.white))),
                ],
              ),
            ),

            isLoading
                ? Center(child: CircularProgressIndicator())
                : Expanded(
                    child: ListView.builder(
                      itemCount: recapData.length,
                      itemBuilder: (context, index) {
                        final item = recapData[index];
                        return Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 12, horizontal: 16),
                          decoration: BoxDecoration(
                            border: Border(
                                bottom:
                                    BorderSide(color: Colors.grey.shade300)),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                  flex: 2, child: Text(item['Nama'] ?? '')),
                              Expanded(
                                  flex: 2,
                                  child: Text(item['Hadir'].toString())),
                              Expanded(
                                  flex: 2,
                                  child: Text(item['Terlambat'].toString())),
                              Expanded(
                                  flex: 2,
                                  child: Text(item['Ijin'].toString())),
                              Expanded(
                                  flex: 2,
                                  child: Text(item['Alfa'].toString())),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
          ],
        ),
      ),
    );
  }
}
