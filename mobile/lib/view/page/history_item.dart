import 'package:flutter/material.dart';
import 'package:mobile/api.dart';
import 'package:mobile/view/widget/history_card.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HistoryItem extends StatefulWidget {
  const HistoryItem({super.key});

  @override
  _HistoryItemState createState() => _HistoryItemState();
}

class _HistoryItemState extends State<HistoryItem> {
  int? userId; // ID user yang diambil dari SharedPreferences

  // List status items yang berisi type, title, value, etc.
  List<Map<String, dynamic>> historyItems = [
    {
      'title': 'Hadir',
      'value': '0',
      'color': Colors.green,
      'icon': Icons.check_circle,
      'type': 'masuk'
    },
    {
      'title': 'Terlambat',
      'value': '0',
      'color': Colors.orange,
      'icon': Icons.access_time,
      'type': 'terlambat'
    },
    {
      'title': 'Ijin',
      'value': '0',
      'color': Colors.blue,
      'icon': Icons.cancel_outlined,
      'type': 'ijin'
    },
    {
      'title': 'Alfa',
      'value': '0',
      'color': Colors.red,
      'icon': Icons.block,
      'type': 'alfa'
    },
    {
      'title': 'Sakit',
      'value': '0',
      'color': Colors.purple,
      'icon': Icons.health_and_safety,
      'type': 'sakit'
    },
  ];

  @override
  void initState() {
    super.initState();
    _loadUserId(); // Memuat userId dari SharedPreferences saat initState
  }

  // Fungsi untuk memuat userId dari SharedPreferences
  Future<void> _loadUserId() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      userId = prefs.getInt('userId'); // Memastikan userId tersedia
    });

    // After userId is loaded, call the function to fetch counts
    if (userId != null) {
      fetchCountsForStatus();
    }
  }

  // Fungsi untuk mengirimkan `type` dan `id` ke backend
  void sendDataToBackend(int id, String type) async {
    final response = await ApiService().postCountByType(id, type);

    if (response.containsKey('error')) {
      // Error handling jika terjadi masalah
      // You can show a snackbar, alert, or update a status here if needed
    } else {
      int count = response['data'][0]['count'];

      if (mounted) {
        setState(() {
          int index = historyItems.indexWhere((item) => item['type'] == type);
          if (index != -1) {
            historyItems[index]['value'] = count.toString();
          }
        });
      }
    }
  }

  // Kirim permintaan ke backend untuk setiap status type
  void fetchCountsForStatus() {
    if (userId != null) {
      for (var item in historyItems) {
        sendDataToBackend(userId!, item['type']);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    // Tunggu hingga userId dimuat untuk memastikan data bisa dikirim
    if (userId == null) {
      return Center(child: CircularProgressIndicator()); // Tampilkan loading indicator jika userId belum tersedia
    }

    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: GridView.builder(
          shrinkWrap: true,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 15,
            mainAxisSpacing: 15,
          ),
          itemCount: historyItems.length,
          itemBuilder: (context, index) {
            return HistoryCard(
              title: historyItems[index]['title'],
              value: historyItems[index]['value'].toString(),
              color: historyItems[index]['color'],
              icon: historyItems[index]['icon'],
            );
          },
        ),
      ),
    );
  }
}
