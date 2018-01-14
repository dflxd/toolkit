        <div class="table-responsive">
            <table class="table table-hover table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>E-mail</th>
                  <th>Privilege</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  <?php
                    include_once "scripts/dbh.inc.php";
                    $sql = "SELECT * FROM users LIMIT 6";
                    $result = mysqli_query($conn, $sql);
                  
                    if (mysqli_num_rows($result) > 0) {
                        while($row = mysqli_fetch_assoc($result)) {
                            $mail = $row['user_mail'];
                            echo "<tr>";
                            echo "<td>" . $row["id"] . "</td>"; 
                            echo "<td>" . $row["user_first"] . "</td>"; 
                            echo "<td>" . $row["user_last"] . "</td>";
                            echo "<td>" . $row["user_mail"] . "</td>";
                            echo "<td>   WorkInProgress</td>";
                            echo "<td>   <button id=" . $row['id'] ." class='delbutton bg-primary'><i class='fas fa-edit'></i></button>";
                            echo "   <button id=" . $row['id'] ." class='delbutton bg-danger'><i class='fas fa-trash-alt'></i></button></td>";
                            echo "</tr>";
                        }
                      echo "</tbody></table>";
                    }
                  ?>