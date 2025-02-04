﻿// <auto-generated />
using CryptoInfo.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FinancialApp.Infrastructure.Migrations
{
    [DbContext(typeof(BaseContext))]
    [Migration("20250202115642_SettingsTables")]
    partial class SettingsTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.20");

            modelBuilder.Entity("FinancialApp.Domain.AppSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ValueType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppSettings");
                });

            modelBuilder.Entity("FinancialApp.Domain.CryptoCurrenciesSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CryptoCurrencySymbol")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FiatCurrencySymbol")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("CryptoCurrenciesSettings");
                });

            modelBuilder.Entity("FinancialApp.Domain.CryptoInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("CryptoCurrentPrice")
                        .HasColumnType("REAL");

                    b.Property<string>("CryptoName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("CrytoDayChange")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("CryptoInformation");
                });
#pragma warning restore 612, 618
        }
    }
}
