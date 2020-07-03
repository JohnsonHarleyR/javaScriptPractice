<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
	integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
	crossorigin="anonymous">
<link href="/css/ms-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">
<title>Minesweeper</title>
</head>
<body>

<!-- Header -->
<section class="header">

</section>

<!-- MainBody -->
<main class="container">

<div id="navigation">
	<a href="/">Go Back</a>
</div>

<c:set var="rows" value="16"/>
<c:set var="cols" value="16"/>

<h1 id="title">Minesweeper</h1>

<table id="board">
	<tr id="head"></tr>
	
	<c:set var="rcount" value="1"/>
	<c:set var="ccount" value="1"/>
	<c:forEach var="row" begin="0" end="${rows}">
		<tr id="row${rcount}">
			<c:forEach var="col" begin="0" end="${cols}">
				<td id="${rcount}${ccount}">
					<img class="square" id="s${rcount}${ccount}" src="ms/unclicked.png"/>
				</td>
				<c:set var="ccount" value="${ccount + 1}"/>
			</c:forEach>
		</tr>
		<c:set var="rcount" value="${rcount + 1}"/>
	</c:forEach>
	
</table>


</main>

<script src="js/ms-game.js"></script>
</body>
</html>