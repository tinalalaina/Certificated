-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 08 sep. 2024 à 08:02
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dashboardmistral1`
--

-- --------------------------------------------------------

--
-- Structure de la table `tbl_projects`
--

CREATE TABLE `tbl_projects` (
  `p_id` int(11) NOT NULL,
  `ptitle` varchar(255) NOT NULL,
  `pprenom` varchar(250) NOT NULL,
  `pnumero` int(250) NOT NULL,
  `pfile` varchar(255) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL,
  `status` enum('verified','unverified','anomalie') DEFAULT 'unverified'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tbl_project_stats`
--

CREATE TABLE `tbl_project_stats` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `username` varchar(255) NOT NULL,
  `projects_added` int(11) DEFAULT 0,
  `projects_modified` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `is_connected` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tbl_projects`
--
ALTER TABLE `tbl_projects`
  ADD PRIMARY KEY (`p_id`);

--
-- Index pour la table `tbl_project_stats`
--
ALTER TABLE `tbl_project_stats`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tbl_projects`
--
ALTER TABLE `tbl_projects`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- AUTO_INCREMENT pour la table `tbl_project_stats`
--
ALTER TABLE `tbl_project_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
