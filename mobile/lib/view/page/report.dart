import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:mobile/view/widget/navbar.dart';

class Report extends StatelessWidget {
  const Report({super.key});

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
          "Laporan Absensi",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Date Range Picker Section
            Row(
              children: [
                Expanded(
                  child: TextField(
                    readOnly: true,
                    decoration: InputDecoration(
                      labelText: "Dari Tanggal",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      suffixIcon: const Icon(Icons.calendar_today),
                    ),
                  ),
                ),
                const Gap(10),
                Expanded(
                  child: TextField(
                    readOnly: true,
                    decoration: InputDecoration(
                      labelText: "Sampai Tanggal",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      suffixIcon: const Icon(Icons.calendar_today),
                    ),
                  ),
                ),
              ],
            ),
            const Gap(20),

            // Filter Dropdown Section
            DecoratedBox(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.grey.shade300, width: 1),
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                child: DropdownButtonFormField<String>(
                  decoration: const InputDecoration.collapsed(hintText: null),
                  hint: const Text("Pilih Filter"),
                  icon: const Icon(Icons.arrow_drop_down, color: Colors.orange),
                  items: const [
                    DropdownMenuItem(value: "Masuk", child: Text("Masuk")),
                    DropdownMenuItem(value: "Terlambat", child: Text("Terlambat")),
                    DropdownMenuItem(value: "Alfa", child: Text("Alfa")),
                    DropdownMenuItem(value: "Sakit", child: Text("Sakit")),
                    DropdownMenuItem(value: "Izin", child: Text("Izin")),
                    DropdownMenuItem(value: "Keluar", child: Text("Keluar")),
                    DropdownMenuItem(value: "Rekap", child: Text("Rekap")),
                  ],
                  onChanged: (value) {},
                  style: const TextStyle(color: Colors.black, fontSize: 16),
                  dropdownColor: Colors.white,
                ),
              ),
            ),
            const Gap(20),

            // Table Header
            Container(
              color: const Color(0xFFFF9B75),
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              child: Row(
                children: const [
                  Expanded(
                      flex: 2,
                      child: Text("Tanggal",
                          style: TextStyle(color: Colors.white))),
                  Expanded(
                      flex: 3,
                      child:
                          Text("Nama", style: TextStyle(color: Colors.white))),
                  Expanded(
                      flex: 2,
                      child: Text("Status",
                          style: TextStyle(color: Colors.white))),
                ],
              ),
            ),

            // Table Content
            Expanded(
              child: ListView.builder(
                itemCount: 10,
                itemBuilder: (context, index) {
                  return Container(
                    padding: const EdgeInsets.symmetric(
                        vertical: 12, horizontal: 16),
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(color: Colors.grey.shade300),
                      ),
                    ),
                    child: Row(
                      children: const [
                        Expanded(flex: 2, child: Text("2025-01-01")),
                        Expanded(flex: 3, child: Text("Frieren")),
                        Expanded(flex: 2, child: Text("Masuk")),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const Navbar(selectedIndex: 1),
    );
  }
}
